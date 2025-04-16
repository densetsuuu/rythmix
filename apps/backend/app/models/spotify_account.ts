import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

import type { SpotifyToken } from '@adonisjs/ally/types'

export default class SpotifyAccount extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true, serializeAs: null })
  declare id: string

  @column()
  declare avatarUrl: string

  @column()
  declare nickName: string

  @column()
  declare name: string

  @column()
  declare favoriteSongId: string

  @column({ serializeAs: null })
  declare email: string

  @column({ serializeAs: null })
  declare token: SpotifyToken

  //#region Metadata
  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'createdAt',
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => value.toISODate(),
    serializeAs: 'updatedAt',
  })
  declare updatedAt: DateTime
  //#endregion

  //#region Relationships
  @column({ serializeAs: null })
  declare userId: string
  //#endregion
}
