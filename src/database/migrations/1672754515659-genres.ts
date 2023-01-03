import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class genres1672754515659 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'genres',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'genre',
              type: 'string'
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('genres')
    }

}
