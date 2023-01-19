import { CreateIntroductionDto, ResponseIntroductionDto } from '@myideaswork/common/dtos';
import { AccountType, ApprovalState } from '@myideaswork/common/enums';
import { Introduction } from '@myideaswork/common/interfaces';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Introductions } from './introductions.entity';

@Injectable()
export class IntroductionsService {
   constructor(
      @InjectRepository(Introductions)
      private introductionsRepository: Repository<Introductions>,
      @Inject(UsersService)
      private userService: UsersService,
   ) {}

   async getMyIntroductions(user: User) {
      try {
         return await this.introductionsRepository.find({
            relations: [
               'createUser',
               'receiveUser',
               'offering',
               'offering.offeringFiles',
               'offering.user',
            ],
            where: [{ createUserId: user.id }, { receiveUserId: user.id }],
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async getMyApprovedIntroductionIds(user: User | undefined): Promise<number[]> {
      const myIntroductions = user ? await this.getMyIntroductions(user) : [];
      const approvedIntroductions = myIntroductions.filter(
         (i) => i.approvalState === ApprovalState.Approved,
      );
      return approvedIntroductions.map((ai) => ai.offering.offeringId);
   }

   async getIntroductionsById(introductionId: number) {
      try {
         return await this.introductionsRepository.findOne({
            relations: [
               'createUser',
               'receiveUser',
               'offering',
               'offering.offeringFiles',
               'offering.user',
            ],
            where: { introductionId: introductionId },
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async getAllIntroductions() {
      try {
         return await this.introductionsRepository.find({
            relations: [
               'createUser',
               'receiveUser',
               'offering',
               'offering.offeringFiles',
               'offering.user',
            ],
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async approveIntroduction(introductionId: number) {
      try {
         const introduction = await this.getIntroductionsById(introductionId);

         if (introduction.receiveUser.accountType === AccountType.Advertiser) {
            if (introduction.receiveUser.purchasedIntroductions <= 0) {
               throw new BadRequestException(
                  'User receiving introduction does not have sufficient introductions purchased',
               );
            } else {
               await this.userService.decrementPurchasedIntroductions(introduction.receiveUser);
            }
         }

         await this.introductionsRepository.update(
            { introductionId: introductionId },
            { approvalState: ApprovalState.Approved },
         );

         return this.getIntroductionsById(introductionId);
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async denyIntroduction(introductionId: number) {
      try {
         await this.introductionsRepository.update(
            { introductionId: introductionId },
            { approvalState: ApprovalState.Denied },
         );
         return await this.getIntroductionsById(introductionId);
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async createIntroduction(introduction: CreateIntroductionDto, user: User) {
      try {
         const userInDB = await this.userService.findById(user.id);

         if (userInDB.purchasedIntroductions <= 0 && userInDB.accountType !== AccountType.Investor)
            throw new BadRequestException(
               'User making introduction does not have sufficient introductions purchased',
            );

         const introductionResponse = await this.introductionsRepository.save({
            ...introduction,
            createUserId: userInDB.id,
            approvalState: ApprovalState.Pending,
         });

         await this.userService.decrementPurchasedIntroductions(userInDB);
         return introductionResponse;
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async filterOfferingsFilesFromApprovedUserIntroduction(
      introductions: ResponseIntroductionDto[],
      user: User,
   ) {
      const approvedIntroductionsOfferingIds = await this.getMyApprovedIntroductionIds(user);
      return introductions.map((i) => {
         return {
            ...i,
            offering: {
               ...i.offering,
               offeringFiles: i.offering.offeringFiles.filter(
                  (f) =>
                     approvedIntroductionsOfferingIds.some((id) => id === f.offeringId) ||
                     i.receiveUser.id === user.id,
               ),
            },
         };
      });
   }
   async filterOfferingFilesFromApprovedUserIntroduction(
      introduction: ResponseIntroductionDto,
      user: User,
   ) {
      const approvedIntroductionsOfferingIds = await this.getMyApprovedIntroductionIds(user);
      return {
         ...introduction,
         offering: {
            ...introduction.offering,
            offeringFiles: introduction.offering.offeringFiles.filter(
               (f) =>
                  approvedIntroductionsOfferingIds.some((id) => id === f.offering?.offeringId) ||
                  introduction.receiveUser.id === user.id,
            ),
         },
      };
   }

   mapIntroductionsToResponseDto(introductions: Introduction[]): ResponseIntroductionDto[] {
      return introductions.map((introduction: Introduction) =>
         this.mapIntroductionToResponseDto(introduction),
      );
   }

   mapIntroductionToResponseDto(introduction: Introduction): ResponseIntroductionDto {
      return plainToClass(ResponseIntroductionDto, instanceToPlain(introduction), {
         excludeExtraneousValues: true,
      });
   }
}

