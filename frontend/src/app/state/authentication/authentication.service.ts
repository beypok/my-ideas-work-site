import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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

  login(loginBody: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/auth/login`, loginBody);
  }

  reAuthenticate(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/auth/reauth`);
  }

  signup(
    createUserInfo: any
  ): Observable<any> {
    let body: any = { ...createUserInfo };
    return this.http.post<any>(`${environment.serverUrl}/users`, body);
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
