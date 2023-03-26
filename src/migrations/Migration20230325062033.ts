import { Migration } from '@mikro-orm/migrations';

export class Migration20230325062033 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "my_day" ("id" serial primary key, "date" timestamptz(0) not null);');

    this.addSql('create table "hour" ("id" serial primary key, "hour" varchar(255) not null, "my_days_id" int not null);');

    this.addSql('create table "to_do" ("id" serial primary key, "hour_id" int not null, "description" varchar(255) not null, "next_action_id" int not null);');
    this.addSql('alter table "to_do" add constraint "to_do_next_action_id_unique" unique ("next_action_id");');

    this.addSql('alter table "hour" add constraint "hour_my_days_id_foreign" foreign key ("my_days_id") references "my_day" ("id") on update cascade;');

    this.addSql('alter table "to_do" add constraint "to_do_hour_id_foreign" foreign key ("hour_id") references "hour" ("id") on update cascade;');
    this.addSql('alter table "to_do" add constraint "to_do_next_action_id_foreign" foreign key ("next_action_id") references "next_action" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "hour" drop constraint "hour_my_days_id_foreign";');

    this.addSql('alter table "to_do" drop constraint "to_do_hour_id_foreign";');

    this.addSql('drop table if exists "my_day" cascade;');

    this.addSql('drop table if exists "hour" cascade;');

    this.addSql('drop table if exists "to_do" cascade;');
  }

}
