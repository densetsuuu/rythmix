import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'spotify_accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()

      table.string('avatar_url').nullable()
      table.string('nick_name')
      table.string('name')
      table.string('favorite_song_id')
      table.json('token').notNullable()
      table.string('email').notNullable().unique().primary()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
