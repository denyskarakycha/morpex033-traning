import { MigrationInterface, QueryRunner } from 'typeorm';

const ADMIN_UUID = 'fb584143-5102-4cd5-a133-5d9dafa8660a';

export class AddSubject1734808665516 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO subject (name, "teacherId") VALUES ('Математика', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Физика', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Химия', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Биология', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('История', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('География', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Литература', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Русский язык', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Английский язык', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Немецкий язык', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Информатика', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Программирование', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Экономика', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Социология', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Политология', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Философия', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Культурология', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Астрономия', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Экология', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Правоведение', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Психология', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Менеджмент', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Архитектура', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Искусствоведение', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Музыка', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Физическая культура', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Логика', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Робототехника', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Графический дизайн', '${ADMIN_UUID}');
INSERT INTO subject (name, "teacherId") VALUES ('Медиаисследования', '${ADMIN_UUID}');
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM subject WHERE name = 'Математика' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Физика' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Химия' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Биология' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'История' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'География' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Литература' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Русский язык' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Английский язык' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Немецкий язык' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Информатика' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Программирование' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Экономика' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Социология' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Политология' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Философия' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Культурология' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Астрономия' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Экология' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Правоведение' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Психология' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Менеджмент' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Архитектура' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Искусствоведение' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Музыка' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Физическая культура' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Логика' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Робототехника' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Графический дизайн' AND "teacherId" = '${ADMIN_UUID}';
DELETE FROM subject WHERE name = 'Медиаисследования' AND "teacherId" = '${ADMIN_UUID}';
`);
  }
}
