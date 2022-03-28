import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class AddChatRoom1648425971988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: 'chat_room',
            columns: [
                {
                    name:'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'name',
                    type: 'text',
                  },
                  {
                    name: 'roomkey',
                    type: 'text',
                    isUnique: true,
                  },
                  {
                      name: 'latitude',
                      type: 'decimal',
                  },
                  {
                      name: 'longitude',
                      type: 'decimal',
                  },
                  {
                      name: 'userId',
                      type: 'int',
                  },
            ],
        }),
    );
        await queryRunner.createTable(
            new Table({
              name: 'message',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                  name: 'chatRoomId',
                  type: 'int',
                },
                {
                  name: 'userId',
                  type: 'int',
                },
                {
                  name: 'contents',
                  type: 'text',
                },
                {
                  name: 'userName',
                  type: 'text',
                },
              ],
            }),
        );

        await queryRunner.createForeignKey(
            'message',
            new TableForeignKey({
              columnNames: ['chatRoomId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'chat_room',
              onDelete: 'CASCADE',
            }),
          );
        await queryRunner.createForeignKey(
            'chat_room',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );
    }

    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('message');
        await queryRunner.dropTable('chat_room');
    }

}
