import { MigrationInterface, QueryRunner } from "typeorm";

export class update1680489945642 implements MigrationInterface {
    name = 'update1680489945642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE offerings MODIFY COLUMN description varchar(255) DEFAULT NULL;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
