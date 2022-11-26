import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { OfferingModule } from './offerings/offerings.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ['envs/production.env', 'envs/.env'],
         isGlobal: true,
      }),
      TypeOrmModule.forRoot({
         type: 'mysql',
         host: process.env.TYPEORM_HOST,
         port: parseInt(process.env.TYPEORM_HOST),
         username: process.env.TYPEORM_USER,
         password: process.env.TYPEORM_PASS,
         database: process.env.TYPEORM_DATABASE,
         autoLoadEntities: true,
         synchronize: process.env.TYPEORM_SYNC === 'true',
      }),
      AccountModule,
      OfferingModule,
   ],
})
export class TypeOrmSetupModule {}
