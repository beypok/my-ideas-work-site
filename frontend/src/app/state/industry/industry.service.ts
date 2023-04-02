import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ResponseIndustryDto} from '@myideaswork/common/dtos';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class IndustryService {
   constructor(private http: HttpClient) {}

   getIndustries(): Observable<ResponseIndustryDto[]> {
      return this.http
         .get<ResponseIndustryDto[]>(`${environment.serverUrl}/industry/all`);
   }


}
