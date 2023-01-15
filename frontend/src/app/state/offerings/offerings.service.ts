import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
   BatchSaveOfferingsDto,
   CreateOfferingDto,
   CreateOfferingFileDto,
   ResponseOfferingDto,
} from '@myideaswork/common/dtos';
import { Offering } from '@myideaswork/common/interfaces';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class OfferingService {
   constructor(private http: HttpClient) {}

   getApprovedOfferings(): Observable<ResponseOfferingDto[]> {
      return this.http.get<ResponseOfferingDto[]>(`${environment.serverUrl}/offerings/approved`);
   }

   getApprovedOffering(id: number): Observable<ResponseOfferingDto> {
      return this.http.get<ResponseOfferingDto>(
         `${environment.serverUrl}/offerings/approved/${id}`,
      );
   }

   getMyOffering(): Observable<ResponseOfferingDto[]> {
      return this.http.get<ResponseOfferingDto[]>(`${environment.serverUrl}/offerings/me`);
   }

   getAllOffering(): Observable<ResponseOfferingDto[]> {
      return this.http.get<ResponseOfferingDto[]>(`${environment.serverUrl}/offerings/all`);
   }

   approveOffering(offering: Offering): Observable<ResponseOfferingDto> {
      return this.http.put<ResponseOfferingDto>(
         `${environment.serverUrl}/offerings/${offering.offeringId}/approve`,
         {},
      );
   }

   denyOffering(offering: Offering): Observable<ResponseOfferingDto> {
      return this.http.put<ResponseOfferingDto>(
         `${environment.serverUrl}/offerings/${offering.offeringId}/deny`,
         {},
      );
   }

   createOffering(createOfferingDto: CreateOfferingDto): Observable<ResponseOfferingDto> {
      return this.http.post<ResponseOfferingDto>(`${environment.serverUrl}/offerings`, {
         ...createOfferingDto,
      });
   }

   async batchSaveOfferings(
      batchSaveOfferings: BatchSaveOfferingsDto,
   ): Promise<ResponseOfferingDto[]> {
      let clonedBatchSaveOfferings: BatchSaveOfferingsDto = {
         data: { ...batchSaveOfferings.data },
         files: [...batchSaveOfferings.files],
      };
      for (let i = 0; i < clonedBatchSaveOfferings.files.length; i++) {
         const file = clonedBatchSaveOfferings.files[i];
         const { url } = await this.uploadFile(file);
         if (url) clonedBatchSaveOfferings.files[i] = { ...file, url };
      }

      return lastValueFrom(
         this.http.post<ResponseOfferingDto[]>(`${environment.serverUrl}/offerings/batchSave`, {
            ...clonedBatchSaveOfferings,
         }),
      );
   }

   private uploadFile(file: CreateOfferingFileDto): Promise<{ url: string }> {
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('offeringId', JSON.stringify(file.offeringId));
      return lastValueFrom(
         this.http.post<{ url: string }>(
            `${environment.serverUrl}/offering-files/upload`,
            formData,
         ),
      );
   }
}
