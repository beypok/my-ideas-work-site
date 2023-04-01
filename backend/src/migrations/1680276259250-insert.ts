import { MigrationInterface, QueryRunner } from "typeorm"

export class insert1680276259250 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO \`user\` (email, password, accountType, purchasedIntroductions, customerId,isAdmin)
                                 VALUES ('admin@myideaswork.com',
                                         '$2b$12$McBdi1N2L9kFU7hucxZFxuYANKIbtSrdWPqvhxJiB2ISR4QhHMIYu', 'Investor', 0,
                                         NULL, 1);`);
        await queryRunner.query(`INSERT INTO \`user\` (email, password, accountType, purchasedIntroductions, customerId,isAdmin)
                                 VALUES ('investors@myideaswork.com',
                                         '$2b$12$McBdi1N2L9kFU7hucxZFxuYANKIbtSrdWPqvhxJiB2ISR4QhHMIYu', 'Investor', 0,
                                         NULL, 1);`);
        await queryRunner.query(`INSERT INTO \`user\` (email, password, accountType, purchasedIntroductions, customerId,isAdmin)
                                 VALUES ('advertiser@myideaswork.com',
                                         '$2b$12$McBdi1N2L9kFU7hucxZFxuYANKIbtSrdWPqvhxJiB2ISR4QhHMIYu', 'Advertiser', 0,
                                         NULL, 1);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
