import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config';

const API_KEY = '1236536512';
const API_KEY_PROD = 'PROD_KEY_ULTRA';

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   user: 'root',
    //   pass: 'root',
    //   dbName: 'store',
    // }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, name } =
          configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName: name,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, port, name, host, user, password } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('store');
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
