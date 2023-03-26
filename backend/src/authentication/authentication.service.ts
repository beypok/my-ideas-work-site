import { BadRequestException, Injectable } from '@nestjs/common';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ResponseAuthenticatedUserDto, ResponseUserDto } from '@myideaswork/common/dtos';
@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
  ) {}

  /** Returns the User with corresponding and valid email and password, else null. */
  async validateUser(loginEmail: string, plainTextPswrd: string): Promise<ResponseUserDto> {
    const user = await this.usersService.findByEmail(loginEmail);
    if (!user) return null;
    if (await this.encryptionService.isMatch(plainTextPswrd, user.password)) {
      return this.usersService.mapUserToResponseDto(user);
    }
  }

  /** Creates a JWT for a given User */
  async issueJWT(user: User): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    return {
      access_token: this.jwtService.sign(payload, { secret: `${process.env.JWT_SECRET}` }),
    };
  }

  async login(user: User): Promise<ResponseAuthenticatedUserDto> {
    const foundUser = await this.usersService.findById(user.id);
    if (!foundUser) throw new BadRequestException();
    const mappedUser = this.usersService.mapUserToResponseDto(foundUser);

    const { access_token } = await this.issueJWT(foundUser);

    return { user: mappedUser, access_token };
  }

  /** Takes an access token that is then verified to be valid and not expired. If its verified a new token is issued along with the users mapped information */
  async reauth(jwtToken: string): Promise<ResponseAuthenticatedUserDto> {
    const json = await this.jwtService.decode(jwtToken);
    if (!json) throw new BadRequestException();

    try {
      await this.jwtService.verify(jwtToken, {
        secret: `${process.env.JWT_SECRET}`,
        ignoreExpiration: false,
      });
    } catch (e) {
      throw new BadRequestException(e);
    }

    const user = await this.usersService.findById(json.sub);
    if (!user) throw new BadRequestException();
    const mappedUser = this.usersService.mapUserToResponseDto(user);

    const { access_token } = await this.issueJWT(user);

    return { user: mappedUser, access_token };
  }
}
