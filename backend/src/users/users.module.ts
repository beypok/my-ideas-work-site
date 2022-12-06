import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'
import { EncryptionModule } from 'src/encryption/encryption.module'
import { AuthenticationModule } from 'src/authentication/authentication.module'

@Module({
   imports: [TypeOrmModule.forFeature([User]), EncryptionModule, AuthenticationModule],
   controllers: [UsersController],
   providers: [UsersService],
   exports: [UsersService],
})
export class UserModule {}
