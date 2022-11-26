import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountsController } from './accounts.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Accounts } from './accounts.entity'

@Module({
   imports: [TypeOrmModule.forFeature([Accounts])],
   controllers: [AccountsController],
   providers: [AccountService],
})
export class AccountModule {}
