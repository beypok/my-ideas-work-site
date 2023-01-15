import { AuthRole } from '@myideaswork/common/enums';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLE_KEY } from '../roles/roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   constructor(private reflector: Reflector) {
      super();
   }

   canActivate(context: ExecutionContext) {
      // Get role from meta data
      const role = this.reflector.getAllAndOverride<AuthRole>(ROLE_KEY, [
         context.getHandler(),
         context.getClass(),
      ]);

      // Exits authentication early when public route
      if (role == AuthRole.Public) return true;

      // Continues authentication and JWT verification
      return super.canActivate(context);
   }
}
