import User from '#models/user'

export const FRIEND_STATUSES = ['pending', 'accepted', 'rejected'] as const
export type FriendStatus = (typeof FRIEND_STATUSES)[number]

export class FriendsService {
  async getFriends(user: User, status?: FriendStatus) {
    return await this.listRequestsByStatus(user, status || 'accepted')
  }

  async sendRequest(user: User, friend: User) {
    if (!user) throw new Error('User not found')
    if (!friend) throw new Error('Friend not found')

    await user.related('friends').attach({
      [friend.id]: {
        sender: true,
      },
    })
    await friend.related('friends').attach([user.id])
  }

  async removeFriend(user: User, friend: User) {
    if (!user) throw new Error('User not found')
    if (!friend) throw new Error('Friend not found')

    await user.related('friends').detach([friend.id])
    await friend.related('friends').detach([user.id])
  }

  async answerRequest(user: User, friend: User, action: 'accept' | 'reject') {
    if (!user) throw new Error('User not found')
    if (!friend) throw new Error('Friend not found')

    // accept -> accepted, reject -> rejected
    const actionResult = `${action}ed`

    await user.related('friends').sync({
      [friend.id]: {
        status: actionResult,
      },
    })
    await friend.related('friends').sync({
      [user.id]: {
        status: actionResult,
      },
    })
  }

  async findRequest(user: User, friend: User) {
    if (!user) throw new Error('User not found')
    if (!friend) throw new Error('Friend not found')

    return await user
      .related('friends')
      .query()
      .pivotColumns(['status', 'sender'])
      .wherePivot('friend_id', friend.id)
      .first()
  }

  async listRequestsByStatus(user: User, status: FriendStatus) {
    if (!user) throw new Error('User not found')

    return await user
      .related('friends')
      .query()
      .pivotColumns(['status', 'sender'])
      .wherePivot('status', status)
  }
}
