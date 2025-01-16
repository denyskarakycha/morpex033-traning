import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobImplementation1736442273286 implements MigrationInterface {
  name = 'JobImplementation1736442273286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "category" jsonb NOT NULL, "pubDate" TIMESTAMP NOT NULL, "remoteWorkFormat" character varying NOT NULL, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "job"`);
  }
}
