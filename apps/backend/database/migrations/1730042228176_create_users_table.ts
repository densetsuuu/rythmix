import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('email').notNullable().unique()
      table.string('username').notNullable()
      table.string('password').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('description').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
