import { MigrationInterface, QueryRunner } from "typeorm";

export class projectPhases1680497766003 implements MigrationInterface {
    name = 'projectPhases1680497766003'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`project_phase\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`INSERT IGNORE INTO \`project_phase\` (id, name) VALUES
            (1, 'Acquisition'),
            (2, 'Seed Startup'),
            (3, 'Research And Development'),
            (4, 'Growth'),
            (5, 'Expansion'),
            (6, 'IPO'),
            (7, 'Pre-seed')`);
        await queryRunner.query(`ALTER TABLE offerings MODIFY COLUMN projectPhase varchar(255) DEFAULT NULL;`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`offerings_project_phase\` (\`offeringId\` int UNSIGNED NOT NULL, \`projectPhaseId\` int NOT NULL, INDEX \`IDX_5ea55dede826bc6f6d8a725a8c\` (\`offeringId\`), INDEX \`IDX_133b704dee7c90f9946f6b9c93\` (\`projectPhaseId\`), PRIMARY KEY (\`offeringId\`, \`projectPhaseId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`offerings_project_phase\` ADD CONSTRAINT \`FK_5ea55dede826bc6f6d8a725a8c3\` FOREIGN KEY (\`offeringId\`) REFERENCES \`offerings\`(\`offeringId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`offerings_project_phase\` ADD CONSTRAINT \`FK_133b704dee7c90f9946f6b9c934\` FOREIGN KEY (\`projectPhaseId\`) REFERENCES \`project_phase\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`RENAME TABLE offerings_industry_focus_industry TO offerings_industry_focus`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`project_phase\``);
        await queryRunner.query(`ALTER TABLE \`offerings_project_phase\` DROP FOREIGN KEY \`FK_133b704dee7c90f9946f6b9c934\``);
        await queryRunner.query(`ALTER TABLE \`offerings_project_phase\` DROP FOREIGN KEY \`FK_5ea55dede826bc6f6d8a725a8c3\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`customerId\` \`customerId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_133b704dee7c90f9946f6b9c93\` ON \`offerings_project_phase\``);
        await queryRunner.query(`DROP INDEX \`IDX_5ea55dede826bc6f6d8a725a8c\` ON \`offerings_project_phase\``);
        await queryRunner.query(`DROP TABLE \`offerings_project_phase\``);
    }


}
