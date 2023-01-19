import { CreateUserDto, ResponseUserDto, UpdateUserDto } from '@myideaswork/common/dtos';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { EncryptionService } from 'src/encryption/encryption.service';
import { DeleteResult, In, Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      private encryptionService: EncryptionService,
   ) {}

   findByIds(ids: number[]): Promise<User[]> {
      return this.usersRepository.find({ where: { id: In(ids) } });
   }

   findById(id: number): Promise<User> {
      return this.usersRepository.findOne({ where: { id } });
   }

   async findByEmail(email: string): Promise<User> {
      return this.usersRepository.findOne({
         where: { email },
      });
   }

   async createUser(user: CreateUserDto): Promise<User> {
      const hashedPassword = await this.hashUserPassword(user);
      try {
         const emailAddressAlreadyUsed = await this.usersRepository.findOne({
            where: { email: user.email },
         });
         if (emailAddressAlreadyUsed)
            throw new BadRequestException('User with this email address already exists');

         return await this.usersRepository.save({
            ...user,
            password: hashedPassword,
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async updateById(user: UpdateUserDto): Promise<User> {
      let mutatedUser: UpdateUserDto = user;
      if (user.password) {
         const hashedPassword = await this.hashUserPassword(user);
         mutatedUser = {
            ...user,
            password: hashedPassword,
         };
      }
      await this.usersRepository.save({ ...mutatedUser });

      return this.findById(mutatedUser.id);
   }

   async updateUserCustomerId(user: User, customerId: string | null): Promise<User> {
      await this.usersRepository.save({ ...user, customerId });
      return this.findById(user.id);
   }

   async updateUserPurchasedIntroductions(
      user: User,
      purchasedIntroductions: number,
   ): Promise<User> {
      const foundUser = await this.findById(user.id);
      await this.usersRepository.save({
         ...user,
         purchasedIntroductions: foundUser.purchasedIntroductions + purchasedIntroductions,
      });
      return {
         ...foundUser,
         purchasedIntroductions: foundUser.purchasedIntroductions + purchasedIntroductions,
      };
   }

   async decrementPurchasedIntroductions(user: User): Promise<User> {
      const userInDB = await this.findById(user.id);
      const purchasedIntroductions = Math.max(userInDB.purchasedIntroductions - 1, 0);
      await this.usersRepository.save({ id: userInDB.id, purchasedIntroductions });
      return { ...userInDB, purchasedIntroductions };
   }

   deleteByIds(ids: number[]): Promise<DeleteResult> {
      return this.usersRepository.delete({ id: In(ids) });
   }

   deleteById(id: number): Promise<DeleteResult> {
      return this.usersRepository.delete({ id });
   }

   mapUsersToResponseDto(users: User[]): ResponseUserDto[] {
      return users.map((user: User) => this.mapUserToResponseDto(user));
   }

   mapUserToResponseDto(user: User): ResponseUserDto {
      return plainToClass(ResponseUserDto, instanceToPlain(user), {
         excludeExtraneousValues: true,
      });
   }

   private async hashUserPassword(user: UpdateUserDto | CreateUserDto): Promise<string> {
      return await this.encryptionService.hash(user.password);
   }
}

