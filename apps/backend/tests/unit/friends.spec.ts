import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import app from '@adonisjs/core/services/app'
import { FriendsService } from '#services/friends_service'
import testUtils from '@adonisjs/core/services/test_utils'

async function setup() {
  const friendService = await app.container.make(FriendsService)
  const [user, friend] = await UserFactory.createMany(2)

  return { friendService, user, friend }
}

test.group('Friends', async (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('target user should receive pending invite', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.sendRequest(user, friend)
    const friendPendingRequests = await friendService.listRequestsByStatus(friend, 'pending')
    const userPendingRequests = await friendService.listRequestsByStatus(user, 'pending')

    // THEN
    assert.exists(userPendingRequests.find((u) => u.id === friend.id))
    assert.exists(friendPendingRequests.find((u) => u.id === user.id))
    assert.notExists(userPendingRequests.find((u) => u.$extras.pivot_status !== 'pending'))
    assert.notExists(friendPendingRequests.find((u) => u.$extras.pivot_status !== 'pending'))
  })

  test('should accept friend request', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.sendRequest(user, friend)
    await friendService.answerRequest(friend, user, 'accept')

    // THEN
    const friends = await friendService.getFriends(user)
    const friendFriends = await friendService.getFriends(friend)

    const friendPendingRequests = await friendService.listRequestsByStatus(friend, 'pending')
    const userPendingRequests = await friendService.listRequestsByStatus(user, 'pending')

    assert.exists(friends.find((u) => u.id === friend.id))
    assert.exists(friendFriends.find((u) => u.id === user.id))

    assert.notExists(userPendingRequests.find((u) => u.id === friend.id))
    assert.notExists(friendPendingRequests.find((u) => u.id === user.id))
  })

  test('should reject friend request', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.sendRequest(user, friend)
    await friendService.answerRequest(friend, user, 'reject')

    // THEN
    const friendPendingRequests = await friendService.listRequestsByStatus(friend, 'rejected')
    const userPendingRequests = await friendService.listRequestsByStatus(user, 'rejected')

    assert.exists(friendPendingRequests.find((u) => u.id === user.id))
    assert.exists(userPendingRequests.find((u) => u.id === friend.id))
  })

  test('should list requests by status', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.sendRequest(user, friend)
    let pendingRequests = await friendService.listRequestsByStatus(user, 'pending')

    assert.isNotEmpty(pendingRequests)

    await friendService.answerRequest(friend, user, 'accept')
    pendingRequests = await friendService.listRequestsByStatus(user, 'pending')
    const acceptedRequests = await friendService.listRequestsByStatus(user, 'accepted')

    // THEN
    assert.isEmpty(pendingRequests)
    assert.isNotEmpty(acceptedRequests)
  })

  test('should remove friend', async ({ assert }) => {
    const { friendService, user, friend } = await setup()

    // WHEN
    await friendService.sendRequest(user, friend)
    await friendService.answerRequest(friend, user, 'accept')
    await friendService.removeFriend(user, friend)

    // THEN
    const friends = await friendService.getFriends(user)
    const friendFriends = await friendService.getFriends(friend)

    assert.isEmpty(friends)
    assert.isEmpty(friendFriends)
  })
})
