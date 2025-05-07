import Room from '#models/room'
import User from '#models/user'

export class RoomService {
  all() {
    return Room.all()
  }

  async create() {
    return await Room.create({})
  }

  async find(id: string | number) {
    return await Room.findOrFail(id)
  }

  async addUserToRoom(userId: number, roomId: number) {
    const user = await User.findOrFail(userId)
    const room = await Room.findOrFail(roomId)
    await user.related('room').associate(room)
    return user
  }

  async removeUserFromRoom(userId: number) {
    const user = await User.findOrFail(userId)
    await user.related('room').dissociate()
    return user
  }

  delete(roomId: number) {
    return Room.query().where('id', roomId).delete()
  }
}
