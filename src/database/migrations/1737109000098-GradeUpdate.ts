import { MigrationInterface, QueryRunner } from "typeorm";

export class GradeUpdate1737109000098 implements MigrationInterface {
    name = 'GradeUpdate1737109000098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_47ee890e96d2e8bab85b056f39a"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_770cab79ce1d111bc05db17cfbd"`);
        await queryRunner.query(`ALTER TABLE "user_subjects_subject" DROP CONSTRAINT "FK_5f6ad4fe37d091be3f9c4c2e04a"`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_770cab79ce1d111bc05db17cfbd" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_47ee890e96d2e8bab85b056f39a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_subjects_subject" ADD CONSTRAINT "FK_5f6ad4fe37d091be3f9c4c2e04a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_subjects_subject" DROP CONSTRAINT "FK_5f6ad4fe37d091be3f9c4c2e04a"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_47ee890e96d2e8bab85b056f39a"`);
        await queryRunner.query(`ALTER TABLE "grade" DROP CONSTRAINT "FK_770cab79ce1d111bc05db17cfbd"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1"`);
        await queryRunner.query(`ALTER TABLE "user_subjects_subject" ADD CONSTRAINT "FK_5f6ad4fe37d091be3f9c4c2e04a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_770cab79ce1d111bc05db17cfbd" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grade" ADD CONSTRAINT "FK_47ee890e96d2e8bab85b056f39a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_48cd9a23912fb4d5ad3b1b90ff1" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
