import { Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Global()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  async hash(plainText: string): Promise<string> {
    const hash = await bcrypt.hash(
      plainText,
      parseInt(this.configService.get<string>('SALT_ROUNDS')),
    );
    return hash;
  }

  async isMatch(plainText: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(plainText, hash);
    return match;
  }
}
