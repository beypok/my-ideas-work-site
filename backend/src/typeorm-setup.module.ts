import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntroductionModule } from './introductions/introductions.module';
import { OfferingModule } from './offerings/offerings.module';
import { UserModule } from './users/users.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ['envs/production.env', 'envs/.env'],
         isGlobal: true,
      }),
      TypeOrmModule.forRoot({
         type: 'mysql',
         host: process.env.TYPEORM_HOST,
         port: parseInt(process.env.TYPEORM_PORT),
         username: process.env.TYPEORM_USER,
         password: process.env.TYPEORM_PASS,
         database: process.env.TYPEORM_DATABASE,
         autoLoadEntities: true,
         synchronize: process.env.TYPEORM_SYNC === 'true',
      }),
      UserModule,
      OfferingModule,
      IntroductionModule,
   ],
})
export class TypeOrmSetupModule {}
