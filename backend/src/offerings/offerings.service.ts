import {
   BatchSaveOfferingsDto,
   CreateOfferingDto,
   ResponseOfferingDto,
} from '@myideaswork/common/dtos';
import { ApprovalState } from '@myideaswork/common/enums';
import { Offering } from '@myideaswork/common/interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { User } from 'src/users/users.entity';
import { In, Repository } from 'typeorm';
import { Offerings } from './offerings.entity';

@Injectable()
export class OfferingsService {
   constructor(
      @InjectRepository(Offerings)
      private offeringsRepository: Repository<Offerings>,
   ) {}

   async getApprovedOfferings() {
      try {
         return await this.offeringsRepository.find({
            relations: ['user'],
            where: { approvalState: ApprovalState.Approved },
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async getMyOfferings(user: User) {
      try {
         return await this.offeringsRepository.find({
            relations: ['user'],
            where: { userId: user.id },
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async getOfferingById(offeringId: number) {
      try {
         return await this.offeringsRepository.findOne({
            relations: ['user'],
            where: { offeringId: offeringId },
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async getAllOfferings() {
      try {
         return await this.offeringsRepository.find({
            relations: ['user'],
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async approveOffering(offeringId: number) {
      try {
         await this.offeringsRepository.update(
            { offeringId: offeringId },
            { approvalState: ApprovalState.Approved },
         );
         return await this.getOfferingById(offeringId);
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async denyOffering(offeringId: number) {
      try {
         await this.offeringsRepository.update(
            { offeringId: offeringId },
            { approvalState: ApprovalState.Denied },
         );
         return await this.getOfferingById(offeringId);
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async createOffering(offering: CreateOfferingDto, user: User) {
      try {
         return await this.offeringsRepository.save({
            ...offering,
            userId: user.id,
            approvalState: ApprovalState.Pending,
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async batchSaveOffering(batchSaveOfferings: BatchSaveOfferingsDto, user: User) {
      try {
         await this.offeringsRepository.save(
            batchSaveOfferings.itemsToCreate.map((i) => {
               return {
                  ...i,
                  userId: user.id,
                  approvalState: ApprovalState.Pending,
               };
            }),
         );
         await this.offeringsRepository.save(
            batchSaveOfferings.itemsToUpdate.map((i) => {
               return {
                  ...i,
                  userId: user.id,
                  approvalState: ApprovalState.Pending,
               };
            }),
         );
         await this.offeringsRepository.delete({
            offeringId: In(batchSaveOfferings.itemsToDeleteIds),
         });

         return await this.getMyOfferings(user);
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   mapOfferingsToResponseDto(offerings: Offering[]): ResponseOfferingDto[] {
      return offerings.map((offering: Offering) => this.mapOfferingToResponseDto(offering));
   }

   mapOfferingToResponseDto(offering: Offering): ResponseOfferingDto {
      return plainToClass(ResponseOfferingDto, instanceToPlain(offering), {
         excludeExtraneousValues: true,
      });
   }
}

