import { Migration } from '@mikro-orm/migrations';

export class Migration20230325205142 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "to_do" alter column "description" type varchar(255) using ("description"::varchar(255));');
    this.addSql('alter table "to_do" alter column "description" drop not null;');
    this.addSql('alter table "to_do" alter column "next_action" type int using ("next_action"::int);');
    this.addSql('alter table "to_do" alter column "next_action" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "to_do" alter column "description" type varchar(255) using ("description"::varchar(255));');
    this.addSql('alter table "to_do" alter column "description" set not null;');
    this.addSql('alter table "to_do" alter column "next_action" type int using ("next_action"::int);');
    this.addSql('alter table "to_do" alter column "next_action" set not null;');
  }

}
