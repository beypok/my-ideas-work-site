import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
   use(req: any, res: any, next: () => void) {
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (token && token !== 'null') {
         const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

         req.user = {
            id: decoded.sub,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
         };
      }
      next();
   }
}
