import { AuthRole } from '@myideaswork/common/enums';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
   constructor(private reflector: Reflector) {}

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const role = this.reflector.getAllAndOverride<AuthRole>(ROLE_KEY, [
         context.getHandler(),
         context.getClass(),
      ]);

      const user = context.switchToHttp().getRequest().user;

      // Always allow if role is public
      if (role === AuthRole.Public) return true;
      // Always allow if user is a founder
      if (user.isAdmin) return true;
      else {
         return false;
      }
   }
}
