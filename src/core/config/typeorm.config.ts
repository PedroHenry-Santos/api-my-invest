import { ConnectionOptions } from 'typeorm';

const ORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [],

  // We are using migrations, synchronize should be set to false.
  synchronize: stringToBool(process.env.DB_SYNCHRONIZE),

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logger: 'advanced-console',
  logging: ['warn', 'error'],

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],

  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: __dirname + '/database/migrations'
  }
};

function stringToBool(str: string) {
  return str === 'true';
}

export default ORMConfig;
