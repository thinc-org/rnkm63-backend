import { config as dotenvConfig } from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { User } from './src/user/user.entity';

dotenvConfig();

const options: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [User],
  migrationsTableName: 'migrations',
  migrations: ['./migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};

export = options;
