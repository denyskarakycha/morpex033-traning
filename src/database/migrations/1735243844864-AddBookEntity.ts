import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBookEntity1735243844864 implements MigrationInterface {
  name = 'AddBookEntity1735243844864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" jsonb NOT NULL, "languages" character varying NOT NULL, "takenAt" TIMESTAMP, "returnBy" TIMESTAMP, "takenById" uuid, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_3ea3c56e9ae566d4764928f4e85" FOREIGN KEY ("takenById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_3ea3c56e9ae566d4764928f4e85"`,
    );
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
