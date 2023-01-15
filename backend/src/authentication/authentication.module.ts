import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { UserModule } from './../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
@Module({
   imports: [
      PassportModule,
      JwtModule.register({
         secret: `${process.env.JWT_SECRET}`,
         signOptions: { expiresIn: '1h' },
      }),
      forwardRef(() => EncryptionModule),
      forwardRef(() => UserModule),
   ],
   controllers: [AuthenticationController],
   providers: [AuthenticationService, LocalStrategy, JwtStrategy],
   exports: [AuthenticationService],
})
export class AuthenticationModule {}
