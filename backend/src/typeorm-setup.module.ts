import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {IntroductionModule} from './introductions/introductions.module';
import {OfferingFilesModule} from './offering-files/offering-files.module';
import {OfferingModule} from './offerings/offerings.module';
import {StaxModule} from './stax/stax.module';
import {UserModule} from './users/users.module';
import {IndustryModule} from "./industry/industry.module";
import {ProjectPhaseModule} from "./project-phase/project-phase.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['envs/production.env', 'envs/.env'],
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQLHOST,
            port: parseInt(process.env.MYSQLPORT),
            username: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE,
            autoLoadEntities: true,
            // synchronize: process.env.TYPEORM_SYNC === 'true',
            migrations: ['dist/src/migrations/*.{ts,js}'],
            entities: ['dist/src/**/*.entity.{ts,js}'],
        }),
        StaxModule,
        UserModule,
        OfferingModule,
        OfferingFilesModule,
        IntroductionModule,
        IndustryModule,
        ProjectPhaseModule
    ],
})
export class TypeOrmSetupModule {
}
