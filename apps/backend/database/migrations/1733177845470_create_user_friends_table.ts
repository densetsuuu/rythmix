import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_friends'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('friend_id').unsigned().references('users.id').onDelete('CASCADE')
      table.enu('status', ['pending', 'accepted', 'rejected']).defaultTo('pending')
      table.boolean('sender').defaultTo(false)
      table.unique(['user_id', 'friend_id'])
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
