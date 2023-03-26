import { Migration } from '@mikro-orm/migrations';

export class Migration20230325205007 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "hour" drop constraint "hour_my_days_id_foreign";');

    this.addSql('alter table "to_do" drop constraint "to_do_next_action_id_foreign";');

    this.addSql('alter table "hour" alter column "hour" type int using ("hour"::int);');
    this.addSql('alter table "hour" rename column "my_days_id" to "my_day_id";');
    this.addSql('alter table "hour" add constraint "hour_my_day_id_foreign" foreign key ("my_day_id") references "my_day" ("id") on update cascade;');

    this.addSql('alter table "to_do" drop constraint "to_do_next_action_id_unique";');
    this.addSql('alter table "to_do" rename column "next_action_id" to "next_action";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "hour" drop constraint "hour_my_day_id_foreign";');

    this.addSql('alter table "hour" alter column "hour" type varchar(255) using ("hour"::varchar(255));');
    this.addSql('alter table "hour" rename column "my_day_id" to "my_days_id";');
    this.addSql('alter table "hour" add constraint "hour_my_days_id_foreign" foreign key ("my_days_id") references "my_day" ("id") on update cascade;');

    this.addSql('alter table "to_do" rename column "next_action" to "next_action_id";');
    this.addSql('alter table "to_do" add constraint "to_do_next_action_id_foreign" foreign key ("next_action_id") references "next_action" ("id") on update cascade;');
    this.addSql('alter table "to_do" add constraint "to_do_next_action_id_unique" unique ("next_action_id");');
  }

}
