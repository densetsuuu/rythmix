import User from '#models/user'
import UserDto from '#dtos/user'

export default class FriendDto extends UserDto {
  declare status: 'pending' | 'accepted' | 'rejected'
  declare sender: boolean

  constructor(user?: User) {
    super(user)
    if (!user?.$extras.pivot_status) return

    this.status = user?.$extras.pivot_status
    this.sender = user?.$extras.pivot_sender
  
  }
}
