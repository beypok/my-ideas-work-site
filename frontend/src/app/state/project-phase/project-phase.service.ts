import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ResponseProjectPhaseDto} from '@myideaswork/common/dtos';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class ProjectPhaseService {
   constructor(private http: HttpClient) {}

   getProjectPhases(): Observable<ResponseProjectPhaseDto[]> {
      return this.http
         .get<ResponseProjectPhaseDto[]>(`${environment.serverUrl}/project-phase/all`);
   }


}
