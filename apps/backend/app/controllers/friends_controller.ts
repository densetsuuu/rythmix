import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { FriendsService } from '#services/friends_service'
import {
  accessUserFriendDetailsValidator,
  answerFriendRequestValidator,
  sendFriendRequestValidator,
  userFriendsRequestValidator,
} from '#validators/friend'
import UserService from '#services/user_service'
import FriendPolicy from '#policies/friend_policy'
import FriendDto from '#dtos/friend'

@inject()
export default class FriendsController {
  constructor(
    private friendsService: FriendsService,
    private userService: UserService
  ) {}

  /**
   * Display a list of resource
   */
  async index({ request, bouncer, auth }: HttpContext) {
    const {
      params: { id: userId },
      status,
    } = await request.validateUsing(userFriendsRequestValidator)

    const user = await this.userService.find(userId)
    await bouncer.with(FriendPolicy).authorize('accessFriends', user)

    const friends = await this.friendsService.getFriends(user, status)
    return friends.map((friend) => new FriendDto(friend))
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, bouncer }: HttpContext) {
    const {
      params: { id: userId },
      friendId,
    } = await request.validateUsing(sendFriendRequestValidator)

    const user = await this.userService.find(userId)
    const friend = await this.userService.find(friendId)

    await friend.load('friends')
    await bouncer.with(FriendPolicy).authorize('accessFriends', user)
    await bouncer.with(FriendPolicy).authorize('sendRequest', friend)

    await this.friendsService.sendRequest(user, friend)
    return response.ok({ message: 'Friend request sent' })
  }

  /**
   * Show individual record
   */
  async show({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ request, bouncer, response, auth }: HttpContext) {
    const { params, action } = await request.validateUsing(answerFriendRequestValidator)
    const { id: userId, friendId } = params

    const user = await this.userService.find(userId)
    const friend = await this.userService.find(friendId)

    const friendRequest = await this.friendsService.findRequest(user, friend)

    if (!friendRequest) {
      return response.notFound({ message: 'Friend request not found' })
    }

    await bouncer.with(FriendPolicy).authorize('accessFriends', user)
    await bouncer.with(FriendPolicy).authorize('answerRequest', friendRequest)

    await this.friendsService.answerRequest(user, friend, action)
    return { message: 'Friend request updated', action: action }
  }

  /**
   * Delete record
   */
  async destroy({ request, auth, bouncer }: HttpContext) {
    const { params } = await request.validateUsing(accessUserFriendDetailsValidator)
    const { id: userId, friendId } = params

    const user = await this.userService.find(userId)
    const friend = await this.userService.find(friendId)

    await friend.load('friends')
    await bouncer.with(FriendPolicy).authorize('accessFriends', user)
    await bouncer.with(FriendPolicy).authorize('removeFriend', friend)

    await this.friendsService.removeFriend(user, friend)
    return { message: 'Friend removed' }
  }
}
