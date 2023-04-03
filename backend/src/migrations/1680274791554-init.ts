import { MigrationInterface, QueryRunner } from "typeorm";

export class init1680274791554 implements MigrationInterface {
    name = 'init1680274791554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`industry\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`offering_files\` (\`offeringFileId\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`offeringId\` int UNSIGNED NOT NULL, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`offeringFileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`user\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`accountType\` varchar(255) NOT NULL, \`purchasedIntroductions\` int UNSIGNED NOT NULL, \`customerId\` varchar(255) NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`offerings\`
                                 (
                                     \`offeringId\`           int UNSIGNED NOT NULL AUTO_INCREMENT,
                                     \`userId\`               int UNSIGNED NOT NULL,
                                     \`name\`                 varchar(255) NOT NULL,
                                     \`description\`          varchar(255) NOT NULL,
                                     \`investorOfferingType\` int          NULL,
                                     \`industry\`             varchar(255)  NULL,
                                     \`location\`             varchar(255) NOT NULL,
                                     \`collateral\`           varchar(255) NOT NULL,
                                     \`terms\`                varchar(255) NOT NULL,
                                     \`contactEmail\`         varchar(255) NOT NULL,
                                     \`approvalState\`        int NOT NULL, \`projectPhase\` varchar(255) NOT NULL, \`amountRequested\` int NULL, \`amountRangeStart\` int NULL, \`amountRangeEnd\` int NULL, PRIMARY KEY (\`offeringId\`))
            ENGINE = InnoDB`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`introductions\` (\`introductionId\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`createUserId\` int UNSIGNED NULL, \`receiveUserId\` int UNSIGNED NOT NULL, \`offeringId\` int UNSIGNED NOT NULL, \`contactEmail\` varchar(255) NULL, \`message\` varchar(255) NOT NULL, \`approvalState\` tinyint NOT NULL, PRIMARY KEY (\`introductionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`offerings_industry_focus_industry\` (\`offeringId\` int UNSIGNED NOT NULL, \`industryId\` int NOT NULL, INDEX \`IDX_32b032a2cb14fb8e7bd7211613\` (\`offeringId\`), INDEX \`IDX_730080556cdd97bee213eb5fad\` (\`industryId\`), PRIMARY KEY (\`offeringId\`, \`industryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`offering_files\` ADD CONSTRAINT \`FK_531bb15cc3c53b256ba573ac05a\` FOREIGN KEY (\`offeringId\`) REFERENCES \`offerings\`(\`offeringId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`offerings\` ADD CONSTRAINT \`FK_0a87c7142978a9dd9ec7571b8e5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`introductions\` ADD CONSTRAINT \`FK_d851ffc9e2622bad7c3e497f6a2\` FOREIGN KEY (\`createUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`introductions\` ADD CONSTRAINT \`FK_5984f31ea372beb5d7a240a7bba\` FOREIGN KEY (\`receiveUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`introductions\` ADD CONSTRAINT \`FK_8f0cc58ea6a80853ea7294448a0\` FOREIGN KEY (\`offeringId\`) REFERENCES \`offerings\`(\`offeringId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`offerings_industry_focus_industry\` ADD CONSTRAINT \`FK_32b032a2cb14fb8e7bd72116138\` FOREIGN KEY (\`offeringId\`) REFERENCES \`offerings\`(\`offeringId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`offerings_industry_focus_industry\` ADD CONSTRAINT \`FK_730080556cdd97bee213eb5fad3\` FOREIGN KEY (\`industryId\`) REFERENCES \`industry\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`offerings_industry_focus_industry\` DROP FOREIGN KEY \`FK_730080556cdd97bee213eb5fad3\``);
        await queryRunner.query(`ALTER TABLE \`offerings_industry_focus_industry\` DROP FOREIGN KEY \`FK_32b032a2cb14fb8e7bd72116138\``);
        await queryRunner.query(`ALTER TABLE \`introductions\` DROP FOREIGN KEY \`FK_8f0cc58ea6a80853ea7294448a0\``);
        await queryRunner.query(`ALTER TABLE \`introductions\` DROP FOREIGN KEY \`FK_5984f31ea372beb5d7a240a7bba\``);
        await queryRunner.query(`ALTER TABLE \`introductions\` DROP FOREIGN KEY \`FK_d851ffc9e2622bad7c3e497f6a2\``);
        await queryRunner.query(`ALTER TABLE \`offerings\` DROP FOREIGN KEY \`FK_0a87c7142978a9dd9ec7571b8e5\``);
        await queryRunner.query(`ALTER TABLE \`offering_files\` DROP FOREIGN KEY \`FK_531bb15cc3c53b256ba573ac05a\``);
        await queryRunner.query(`DROP INDEX \`IDX_730080556cdd97bee213eb5fad\` ON \`offerings_industry_focus_industry\``);
        await queryRunner.query(`DROP INDEX \`IDX_32b032a2cb14fb8e7bd7211613\` ON \`offerings_industry_focus_industry\``);
        await queryRunner.query(`DROP TABLE \`offerings_industry_focus_industry\``);
        await queryRunner.query(`DROP TABLE \`introductions\``);
        await queryRunner.query(`DROP TABLE \`offerings\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`offering_files\``);
        await queryRunner.query(`DROP TABLE \`industry\``);
    }

}
