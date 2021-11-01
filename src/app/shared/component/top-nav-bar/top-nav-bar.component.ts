import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/_constant/app-constant';

@Component({
  selector: 'top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
})
export class TopNavBarComponent implements OnInit {
  @Input()
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  logout() {
    const data = {
      refreshToken: this.cookieService.get(AppConstant.COOKIE_KEY_REFRESH),
    };

    this.authService.logout(data).subscribe((response) => {
      this.authService.deleteAllCookie();
      this.router.navigate(['/auth/login']);
    });
  }
}
