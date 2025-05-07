import { BaseModelDto } from '@adocasts.com/dto/base'
import Room from '#models/room'

export default class RoomDto extends BaseModelDto {
  declare id: string
  declare createdAt: string
  declare updatedAt: string

  constructor(room?: Room) {
    super()

    if (!room) return
    this.id = room.id
    this.createdAt = room.createdAt.toISO()!
    this.updatedAt = room.updatedAt.toISO()!
  }
}