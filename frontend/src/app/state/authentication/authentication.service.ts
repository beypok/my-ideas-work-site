import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
   CreateUserDto,
   ResponseAuthenticatedUserDto,
   ResponseUserDto,
} from '@myideaswork/common/dtos';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

export const ACCESS_TOKEN_LS_KEY = 'access_token';

@Injectable({
   providedIn: 'root',
})
export class AuthenticationService {
   $accessToken = new Subject<string | null>();

   constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

   signout(): void {
      this.removeAccessToken();
   }

   login(loginBody: { email: string; password: string }): Observable<ResponseUserDto> {
      return this.http.post<ResponseUserDto>(`${environment.serverUrl}/auth/login`, loginBody);
   }

   reAuthenticate(): Observable<ResponseAuthenticatedUserDto> {
      return this.http.get<ResponseAuthenticatedUserDto>(`${environment.serverUrl}/auth/reauth`);
   }

   signup(createUserInfo: CreateUserDto): Observable<ResponseAuthenticatedUserDto> {
      let body: CreateUserDto = { ...createUserInfo };
      return this.http.post<ResponseAuthenticatedUserDto>(`${environment.serverUrl}/users`, body);
   }

   getCustomerPaymentMethods(): Observable<any[]> {
      return this.http.get<any[]>(`${environment.serverUrl}/stax/paymentMethods/me`);
   }

   setAccessToken(access_token: string): void {
      this.localStorageService.set(ACCESS_TOKEN_LS_KEY, access_token);
      this.$accessToken.next(access_token);
   }

   getAccessToken(): string | null {
      return this.localStorageService.get(ACCESS_TOKEN_LS_KEY);
   }

   private removeAccessToken() {
      this.localStorageService.remove(ACCESS_TOKEN_LS_KEY);
      this.$accessToken.next(null);
   }
}
