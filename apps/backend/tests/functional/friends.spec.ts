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

  test('should not be able to send a friend request to himself', async ({ client }) => {
    const { user } = await setup()

    const response = await client
      .post(`/users/${user.id}/friends`)
      .json({
        friendId: user.id,
      })
      .loginAs(user)

    response.assertTextIncludes('You cannot send a friend request to yourself')
    response.assertStatus(403)
  })

  test('should be able to send a friend request', async ({ client, assert }) => {
    const { friendService, user, friend } = await setup()

    const response = await client
      .post(`/users/${user.id}/friends`)
      .json({
        friendId: friend.id,
      })
      .loginAs(user)

    response.assertTextIncludes('Friend request sent')
    response.assertStatus(200)
  })

  test('should not be able to send a friend request to a friend', async ({ client, assert }) => {
    const { friendService, user, friend } = await setup()

    await friendService.sendRequest(user, friend)
    await friendService.answerRequest(friend, user, 'accept')

    const response = await client
      .post(`/users/${user.id}/friends`)
      .json({
        friendId: friend.id,
      })
      .loginAs(user)

    response.assertTextIncludes('You are already friends')
    response.assertStatus(403)
  })

  test('should not be able to delete a non friend user', async ({ client, assert }) => {
    const { user, friend } = await setup()

    const response = await client.delete(`/users/${user.id}/friends/${friend.id}`).loginAs(user)

    response.assertTextIncludes('You are not friends')
    response.assertStatus(403)
  })

  test('should not be able to answer a non existing friend request', async ({ client, assert }) => {
    const { user } = await setup()

    const response = await client
      .put(`/users/${user.id}/friends/2`)
      .json({
        action: 'accept',
      })
      .loginAs(user)

    response.assertTextIncludes('Friend request not found')
    response.assertStatus(404)
  })

  test('should answer a friend request', async ({ client, assert }) => {
    const { friendService, user, friend } = await setup()

    await friendService.sendRequest(user, friend)

    const requestBefore = await friendService.findRequest(user, friend)
    const response = await client
      .put(`/users/${friend.id}/friends/${user.id}`)
      .json({
        action: 'accept',
      })
      .loginAs(friend)

    const requestAfter = await friendService.findRequest(user, friend)

    assert.equal(requestBefore?.$extras.pivot_status, 'pending')
    assert.equal(requestAfter?.$extras.pivot_status, 'accepted')
    response.assertTextIncludes('Friend request updated')
    response.assertStatus(200)
  })

  test('should not be able to answer his own friend request', async ({ client, assert }) => {
    const { friendService, user, friend } = await setup()

    await friendService.sendRequest(user, friend)

    const response = await client
      .put(`/users/${user.id}/friends/${friend.id}`)
      .json({
        action: 'accept',
      })
      .loginAs(user)

    response.assertTextIncludes('You cannot answer your own request')
    response.assertStatus(403)
  })
})
