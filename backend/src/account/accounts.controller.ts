import { Controller, Get } from '@nestjs/common'
import { AccountService } from './account.service'

@Controller('/accounts')
export class AccountsController {
   constructor(private readonly accountsService: AccountService) {}

   @Get()
   accounts(): string {
      return 'Account'
   }
}
