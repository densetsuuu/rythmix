import { RoomService } from '#services/room_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class RoomsController {
  constructor(private _roomService: RoomService) {}

  async index({}: HttpContext) {
    return await this._roomService.all()
  }

  async store({ session, response }: HttpContext) {
    const room = await this._roomService.create()

    session.flash('success', 'Room created')
  }

  async show({ params, response }: HttpContext) {
    const room = await this._roomService.find(params.id)
    if (!room) {
      return response.status(404).json({ message: 'Room not found' })
    }
    response.ok(room)
  }

  async destroy({ params, response }: HttpContext) {
    const deleted = await this._roomService.delete(params.id)
    if (!deleted) {
      return response.status(404).json({ message: 'User not found or not deleted' })
    }
    response.ok({ message: 'User deleted successfully' })
  }

  async addUser({ request, response }: HttpContext) {
    const { userId, roomId } = request.only(['userId', 'roomId'])

    try {
      const user = await this._roomService.addUserToRoom(userId, roomId)
      return response.ok({ message: 'User added to room', user })
    } catch {
      return response.status(400).json({ message: 'Could not add user to room' })
    }
  }

  async removeUser({ request, response }: HttpContext) {
    const { userId } = request.only(['userId'])

    try {
      const user = await this._roomService.removeUserFromRoom(userId)
      return response.ok({ message: 'User removed from room', user })
    } catch {
      return response.status(400).json({ message: 'Could not remove user from room' })
    }
  }

}
