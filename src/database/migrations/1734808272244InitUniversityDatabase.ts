import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUniversityDatabase1734808272244 implements MigrationInterface {
  name = ' InitUniversityDatabase1734808272244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "teacherId" uuid, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grade" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "studentId" uuid, "subjectId" uuid, CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_subjects_subject" ("userId" uuid NOT NULL, "subjectId" uuid NOT NULL, CONSTRAINT "PK_872492d44e4c83a9bdff897d791" PRIMARY KEY ("userId", "subjectId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4bd563d26472977cff0082067e" ON "user_subjects_subject" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f6ad4fe37d091be3f9c4c2e04" ON "user_subjects_subject" ("subjectId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" ADD CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" ADD CONSTRAINT "FK_770cab79ce1d111bc05db17cfbd" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" ADD CONSTRAINT "FK_47ee890e96d2e8bab85b056f39a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subjects_subject" ADD CONSTRAINT "FK_4bd563d26472977cff0082067e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subjects_subject" ADD CONSTRAINT "FK_5f6ad4fe37d091be3f9c4c2e04a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`
      INSERT INTO "user" (id, name, email, password, age, role)
      VALUES (
        'fb584143-5102-4cd5-a133-5d9dafa8660a',
        'admin',
        'admin@gmail.com',
        'admin',
        30,
        'ADMIN'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_subjects_subject" DROP CONSTRAINT "FK_5f6ad4fe37d091be3f9c4c2e04a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_subjects_subject" DROP CONSTRAINT "FK_4bd563d26472977cff0082067e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" DROP CONSTRAINT "FK_47ee890e96d2e8bab85b056f39a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade" DROP CONSTRAINT "FK_770cab79ce1d111bc05db17cfbd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subject" DROP CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f6ad4fe37d091be3f9c4c2e04"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4bd563d26472977cff0082067e"`,
    );
    await queryRunner.query(`DROP TABLE "user_subjects_subject"`);
    await queryRunner.query(`DROP TABLE "grade"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "subject"`);
  }
}
