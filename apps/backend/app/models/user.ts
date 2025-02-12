import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import SpotifyAccount from './spotify_account.js'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @hasOne(() => SpotifyAccount)
  declare profile: HasOne<typeof SpotifyAccount>

  @manyToMany(() => User, {
    pivotTable: 'user_friends',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'friend_id',
    pivotColumns: ['status', 'sender'],
  })
  declare friends: ManyToMany<typeof User>

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

  currentAccessToken?: AccessToken
  static accessTokens = DbAccessTokensProvider.forModel(User)
  //#endregion
}
