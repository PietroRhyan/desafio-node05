import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class orders1672755053899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'orders',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'game_id',
              type: 'uuid',
            },
            {
              name: 'value',
              type: 'number'
            }
          ],
        })
      )

      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          name: 'FKOrders',
          referencedTableName: 'games',
          referencedColumnNames: ['id'],
          columnNames: ['game_id'],
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL'  
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders', 'FKOrders')

      await queryRunner.dropTable('orders')
    }

}
