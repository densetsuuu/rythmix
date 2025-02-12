import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import User from '#models/user'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class FriendPolicy extends BasePolicy {
  accessFriends(user: User, targetUser: User): AuthorizerResponse {
    return user.id === targetUser.id
  }

  answerRequest(user: User, friend: User): AuthorizerResponse {
    const isPending = friend?.$extras.pivot_status === 'pending'
    const isSender = friend?.$extras.pivot_sender

    if (!isPending) return AuthorizationResponse.deny('Friend request not pending')
    if (isSender) return AuthorizationResponse.deny('You cannot answer your own request')
    return true
  }

  sendRequest(user: User, friend: User): AuthorizerResponse {
    if (friend.friends.find((u) => u.id === user.id)) {
      return AuthorizationResponse.deny('You are already friends')
    }
    if (user.id === friend.id) {
      return AuthorizationResponse.deny('You cannot send a friend request to yourself')
    }
    return true
  }

  removeFriend(user: User, friend: User): AuthorizerResponse {
    if (!friend.friends?.find((u) => u.id === user.id)) {
      return AuthorizationResponse.deny('You are not friends')
    }
    return true
  }
}
