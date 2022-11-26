import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get()
   app(): string {
      return 'myideaswork backend is connected!'
   }
}
