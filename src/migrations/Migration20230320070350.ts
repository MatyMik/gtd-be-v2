import { Migration } from '@mikro-orm/migrations';

export class Migration20230320070350 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tag" ("id" serial primary key, "name" varchar(255) not null, "color" varchar(255) null, "user_id" int not null);');

    this.addSql('create table "topic" ("id" serial primary key, "name" varchar(255) not null, "user_id" int not null);');

    this.addSql('create table "project" ("id" serial primary key, "name" varchar(255) not null, "deadline" int null, "tags" text[] null, "active" boolean not null default true, "done" boolean not null default false, "topic_id" int not null, "user_id" int not null);');

    this.addSql('create table "next_action" ("id" serial primary key, "name" varchar(255) not null, "deadline" timestamptz(0) null, "tags_id" int not null, "done" boolean not null default false, "description" varchar(255) null, "project_id" int not null, "user_id" int not null, "created_at" timestamptz(0) not null);');

    this.addSql('create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null);');

    this.addSql('alter table "project" add constraint "project_topic_id_foreign" foreign key ("topic_id") references "topic" ("id") on update cascade;');

    this.addSql('alter table "next_action" add constraint "next_action_tags_id_foreign" foreign key ("tags_id") references "tag" ("id") on update cascade;');
    this.addSql('alter table "next_action" add constraint "next_action_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;');
  }

}
