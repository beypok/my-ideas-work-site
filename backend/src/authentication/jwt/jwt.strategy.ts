import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: `${process.env.JWT_SECRET}`,
      });
   }

   async validate(payload: any) {
      // Attaches the following user property onto the request object
      return {
         id: payload.sub,
         email: payload.email,
         isAdmin: payload.isAdmin,
      };
   }
}
