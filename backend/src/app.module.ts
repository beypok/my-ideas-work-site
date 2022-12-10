import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './authentication/jwt/jwt-authentication.guard';
import { TypeOrmSetupModule } from './typeorm-setup.module';

@Module({
   imports: [TypeOrmSetupModule],
   controllers: [AppController],
   providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}

