import { AuthRole } from '@myideaswork/common/enums';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Request, Put } from '@nestjs/common'
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Role } from 'src/authentication/roles/roles.decorator';
import { UsersService } from './users.service'
import { CreateUserDto, UpdateUserDto, ResponseUserDto, ResponseAuthenticatedUserDto } from '@myideaswork/common/dtos'
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
   constructor(
      private readonly userService: UsersService,
      private readonly authenticationService: AuthenticationService
   ) {}

   @Get()
  async findByIds(@Query('ids') idsString: string): Promise<ResponseUserDto[]> {
    const ids = idsString.split(',').map((id) => parseInt(id));
    const users = await this.userService.findByIds(ids);

    if (users.length < ids.length) {
      const notFoundIds = [];
      ids.forEach((id) => {
        if (!users.some((user) => user.id === id)) {
          notFoundIds.push(id);
        }
      });
      throw new NotFoundException(`Could not find users with the ids: ${notFoundIds}`);
    }

    return this.userService.mapUsersToResponseDto(users);
  }

  @Role(AuthRole.Public)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ResponseUserDto> {
    const user = await this.userService.findById(id);
    if (user) return this.userService.mapUserToResponseDto(user);

    throw new NotFoundException();
  }

  @Post()
  @Role(AuthRole.Public)
  async makeUser(@Body() body: CreateUserDto): Promise<ResponseAuthenticatedUserDto> {
    const user = await this.userService.createUser(body);
    const { access_token } = await this.authenticationService.issueJWT(user);
    return { user: this.userService.mapUserToResponseDto(user), access_token };
  }

  @Put('me')
  async updateById(@Body() body: UpdateUserDto, @Request() req): Promise<ResponseUserDto> {
    if (!req.user.isAdmin || (req.user.isAdmin && !body.id)) {
      body.id = req.user.id;
    }

    const user = await this.userService.updateById(body);
    return this.userService.mapUserToResponseDto(user);
  }

  @Delete('me')
  async deleteById(@Request() req): Promise<DeleteResult> {
    const id = req.user.id;
    return await this.userService.deleteById(id);
  }
}
