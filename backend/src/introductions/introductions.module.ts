import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaxModule } from 'src/stax/stax.module';
import { UserModule } from 'src/users/users.module';
import { IntroductionsController } from './introductions.controller';
import { Introductions } from './introductions.entity';
import { IntroductionsService } from './introductions.service';

@Module({
   imports: [TypeOrmModule.forFeature([Introductions]), UserModule, StaxModule],
   controllers: [IntroductionsController],
   providers: [IntroductionsService],
   exports: [IntroductionsService],
})
export class IntroductionModule {}

