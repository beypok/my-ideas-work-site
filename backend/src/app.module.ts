import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmSetupModule } from './typeorm-setup.module'

@Module({
   imports: [TypeOrmSetupModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
