import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntroductionsController } from './introductions.controller';
import { Introductions } from './introductions.entity';
import { IntroductionsService } from './introductions.service';

@Module({
   imports: [TypeOrmModule.forFeature([Introductions])],
   controllers: [IntroductionsController],
   providers: [IntroductionsService],
   exports: [IntroductionsService],
})
export class IntroductionModule {}

