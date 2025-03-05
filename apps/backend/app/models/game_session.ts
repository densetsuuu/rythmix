import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import User from './user.js'

export default class GameSession extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  /*@column()
  public code: string

  @column()
  public isActive: boolean

  @hasMany(() => User)
  public players: HasMany<typeof User>*/

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
