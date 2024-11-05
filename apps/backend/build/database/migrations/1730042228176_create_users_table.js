import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'users';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('id').primary().notNullable();
            table.string('email').nullable();
            table.string('nick_name');
            table.string('name');
            table.boolean('is_verified');
            table.string('avatar_url').nullable();
            table.json('token');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1730042228176_create_users_table.js.map