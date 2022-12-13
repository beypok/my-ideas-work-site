import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
   BatchSaveOfferingsDto,
   CreateOfferingDto,
   ResponseOfferingDto,
} from '@myideaswork/common/dtos';
import { Offering } from '@myideaswork/common/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class OfferingService {
   constructor(private http: HttpClient) {}

   getApprovedOfferings(): Observable<ResponseOfferingDto[]> {
      return this.http.get<ResponseOfferingDto[]>(`${environment.serverUrl}/offerings/approved`);
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

   batchSaveOfferings(
      batchSaveOfferings: BatchSaveOfferingsDto,
   ): Observable<ResponseOfferingDto[]> {
      return this.http.post<ResponseOfferingDto[]>(`${environment.serverUrl}/offerings/batchSave`, {
         ...batchSaveOfferings,
      });
   }
}
