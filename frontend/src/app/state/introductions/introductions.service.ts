import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateIntroductionDto, ResponseIntroductionDto } from '@myideaswork/common/dtos';
import { Introduction } from '@myideaswork/common/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class IntroductionService {
   constructor(private http: HttpClient) {}

   getApprovedIntroductions(): Observable<ResponseIntroductionDto[]> {
      return this.http.get<ResponseIntroductionDto[]>(
         `${environment.serverUrl}/introductions/approved`,
      );
   }

   getApprovedIntroduction(id: number): Observable<ResponseIntroductionDto> {
      return this.http.get<ResponseIntroductionDto>(
         `${environment.serverUrl}/introductions/approved/${id}`,
      );
   }

   getMyIntroduction(): Observable<ResponseIntroductionDto[]> {
      return this.http.get<ResponseIntroductionDto[]>(`${environment.serverUrl}/introductions/me`);
   }

   getAllIntroduction(): Observable<ResponseIntroductionDto[]> {
      return this.http.get<ResponseIntroductionDto[]>(`${environment.serverUrl}/introductions/all`);
   }

   approveIntroduction(introduction: Introduction): Observable<ResponseIntroductionDto> {
      return this.http.put<ResponseIntroductionDto>(
         `${environment.serverUrl}/introductions/${introduction.introductionId}/approve`,
         {},
      );
   }

   denyIntroduction(introduction: Introduction): Observable<ResponseIntroductionDto> {
      return this.http.put<ResponseIntroductionDto>(
         `${environment.serverUrl}/introductions/${introduction.introductionId}/deny`,
         {},
      );
   }

   createIntroduction(
      createIntroductionDto: CreateIntroductionDto,
   ): Observable<ResponseIntroductionDto> {
      return this.http.post<ResponseIntroductionDto>(`${environment.serverUrl}/introductions`, {
         ...createIntroductionDto,
      });
   }
}
