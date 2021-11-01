import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppConstant } from 'src/app/_constant/app-constant';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cookieService.deleteAll();
  }

  login(): void {
    const data = {
      username: this.loginForm.controls.userName.value.trim(),
      password: this.loginForm.controls.password.value.trim(),
    };

    this.authService.login(data).subscribe(
      (response) => {
        if (response !== null) {
          const expiresDateToken = this.getExpiresDate(
            response.token
          );

          this.cookieService.set(
            AppConstant.COOKIE_KEY_TOKEN,
            response.token,
            expiresDateToken
          );

          this.cookieService.set(
            AppConstant.COOKIE_KEY_USERINFO,
            JSON.stringify(response.data),
            expiresDateToken
          );
          this.router.navigate(['dashboard']);
        } else {
          this.toastrService.error('Incorrect username or password');
        }
      },
      (err) => {
        console.log('in error');
        this.toastrService.error('Incorrect username or password');
      }
    );
  }

  private getExpiresDate(token: string): Date {
    const decoded: any = jwt_decode(token);
    return new Date(decoded.exp * 1000);
  }
}
