import { Migration } from '@mikro-orm/migrations';

export class Migration20230320170532 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "next_action_tags" ("next_action_id" int not null, "tag_id" int not null, constraint "next_action_tags_pkey" primary key ("next_action_id", "tag_id"));');

    this.addSql('alter table "next_action_tags" add constraint "next_action_tags_next_action_id_foreign" foreign key ("next_action_id") references "next_action" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "next_action_tags" add constraint "next_action_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "next_action" drop constraint "next_action_tags_id_foreign";');

    this.addSql('alter table "next_action" drop column "tags_id";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "next_action_tags" cascade;');

    this.addSql('alter table "next_action" add column "tags_id" int not null;');
    this.addSql('alter table "next_action" add constraint "next_action_tags_id_foreign" foreign key ("tags_id") references "tag" ("id") on update cascade;');
  }

}
