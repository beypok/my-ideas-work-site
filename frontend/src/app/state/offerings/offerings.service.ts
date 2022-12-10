import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
   BatchSaveOfferingsDto,
   CreateOfferingDto,
   ResponseOfferingDto,
} from '@myideaswork/common/dtos';

@Injectable({
   providedIn: 'root',
})
export class OfferingService {
   constructor(private http: HttpClient) {}

   getMyOffering(): Observable<ResponseOfferingDto[]> {
      return this.http.get<ResponseOfferingDto[]>(`${environment.serverUrl}/offerings/me`);
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
