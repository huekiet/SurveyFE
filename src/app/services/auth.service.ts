import { CookieService } from 'ngx-cookie-service';
import { RefreshTokenResponse } from './../models/refresh-token-response';
import { AppConstant } from './../_constant/app-constant';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private baseService: BaseService,
    private cookieService: CookieService
  ) {}

  login(data): Observable<LoginResponse> {
    return this.baseService.post<LoginResponse>(
      `${AppConstant.API_URL}/auth/login`,
      data
    );
  }

  register(data): Observable<LoginResponse> {
    return this.baseService.post<LoginResponse>(
      `${AppConstant.API_URL}/auth/register`,
      data
    );
  }

  refreshToken(data): Observable<RefreshTokenResponse> {
    return this.baseService.post<RefreshTokenResponse>(
      `${AppConstant.API_URL}/auth/refresh-tokens`,
      data
    );
  }

  logout(data): Observable<any> {
    return this.baseService.post(`${AppConstant.API_URL}/auth/logout`, data);
  }

  deleteAllCookie() {
    this.cookieService.deleteAll();
  }
}
