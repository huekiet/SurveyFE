import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { AppConstant } from '../_constant/app-constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private cookieService: CookieService) {}

  getUserFromCookie() {
    let user;
    try {
      user = JSON.parse(
        this.cookieService.get(AppConstant.COOKIE_KEY_USERINFO)
      );
    } catch {
      user = null;
    }
    return user;
  }

  getRoleFromCookie() {
    let user = this.getUserFromCookie();
    let role;
    if (user !== null) {
      role = user.role;
    } else {
      role = null;
    }
    return role;
  }
}
