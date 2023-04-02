import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { JwtMiddleware } from './authentication/jwt/jwt.middleware';

config();

async function bootstrap() {
   const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'],cors: true });
   app.use(new JwtMiddleware().use);
   await app.listen(3000);
}
bootstrap();

