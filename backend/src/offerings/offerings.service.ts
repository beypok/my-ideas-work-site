import {
   BatchSaveOfferingsDto,
   CreateOfferingDto,
   CreateOfferingFileDto,
   ResponseOfferingDto,
   UpdateOfferingDto,
} from '@myideaswork/common/dtos';
import { ApprovalState } from '@myideaswork/common/enums';
import { Offering } from '@myideaswork/common/interfaces';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { IntroductionsService } from 'src/introductions/introductions.service';
import { OfferingFiles } from 'src/offering-files/offering-files.entity';
import { OfferingFilesService } from 'src/offering-files/offering-files.service';
import { User } from 'src/users/users.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { Offerings } from './offerings.entity';

@Injectable()
export class OfferingsService {
   constructor(
      @InjectRepository(Offerings)
      private offeringsRepository: Repository<Offerings>,
      @Inject(OfferingFilesService)
      private readonly offeringsFilesService: OfferingFilesService,
      @Inject(IntroductionsService)
      private readonly introductionsService: IntroductionsService,
   ) {}

   async getApprovedOfferings() {
      try {
         return await this.offeringsRepository.find({
            relations: ['user', 'offeringFiles'],
            where: { approvalState: ApprovalState.Approved },
         });
      } catch (e: any) {
         if (e.message) {
            throw new BadRequestException(e.message);
         }
      }
   }

   async getApprovedOffering(offeringId: number) {
      try {
         return await this.offeringsRepository.findOne({
            relations: ['user', 'offeringFiles'],
            where: { approvalState: ApprovalState.Approved, offeringId },
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
            relations: ['user', 'offeringFiles'],
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
            relations: ['user', 'offeringFiles'],
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
            relations: ['user', 'offeringFiles'],
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
         await this.handleFileCreations(batchSaveOfferings.files);
         await this.handleBatchCreate(batchSaveOfferings.data.itemsToCreate, user);
         await this.handleBatchUpdate(batchSaveOfferings.data.itemsToUpdate, user);
         await this.handleBatchDelete(batchSaveOfferings.data.itemsToDeleteIds);

         return await this.getMyOfferings(user);
      } catch (e: any) {
         if (e.message) {
            console.log(e);
            throw new BadRequestException(e.message);
         }
      }
   }

   async filterOfferingFilesFromApprovedUserIntroduction(
      offering: ResponseOfferingDto,
      user: User | undefined,
   ): Promise<ResponseOfferingDto> {
      const approvedIntroductionsOfferingIds =
         await this.introductionsService.getMyApprovedIntroductionIds(user);
      return {
         ...offering,
         offeringFiles:
            offering?.offeringFiles.filter(
               (f) =>
                  approvedIntroductionsOfferingIds.some((id) => id === f.offeringId) ||
                  offering.user.id === user?.id,
            ) ?? [],
      };
   }

   private handleBatchCreate(items: CreateOfferingDto[], user: User): Promise<Offerings[]> {
      if (items.length === 0) return new Promise((resolve, reject) => resolve([]));
      return this.offeringsRepository.save(
         items.map((i) => {
            delete i.offeringFiles;
            return {
               ...i,
               userId: user.id,
               approvalState: ApprovalState.Pending,
            };
         }),
      );
   }

   private handleBatchUpdate(items: UpdateOfferingDto[], user: User): Promise<Offerings[]> {
      if (items.length === 0) return new Promise((resolve, reject) => resolve([]));
      return this.offeringsRepository.save(
         items.map((i) => {
            delete i.offeringFiles;
            return {
               ...i,
               userId: user.id,
               approvalState: ApprovalState.Pending,
            };
         }),
      );
   }

   private handleBatchDelete(offeringIds: number[]): Promise<DeleteResult> {
      if (offeringIds.length === 0)
         return new Promise((resolve, reject) => resolve(new DeleteResult()));
      return this.offeringsRepository.delete({
         offeringId: In(offeringIds),
      });
   }

   private handleFileCreations(files: CreateOfferingFileDto[]): Promise<OfferingFiles[]> {
      return this.offeringsFilesService.createOfferingFiles(files);
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

