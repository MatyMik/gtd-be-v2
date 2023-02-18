import { User } from "./src/authentication/entities/user.entity";

export default {
  entities: [User], // no need for `entitiesTs` this way
  dbName: 'postgres',
  type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
};