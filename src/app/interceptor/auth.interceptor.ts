import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponseBase,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  private checkStatus(ev: any) {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 400) {
      return;
    }
  }

  private goto(url: string) {
    setTimeout(() => this.router.navigateByUrl(url));
  }
  private handleData(ev: any): Observable<any> {
    this.checkStatus(ev);
    switch (ev.status) {
      case 200:
        break;
      case 401:
        console.log('in this');
        if (this.router.url !== '/auth/login') {
          this.toastrService.error('Session expired');
          this.cookieService.deleteAll();
          this.goto('/auth/login');
        } else {
          this.toastrService.error('Login failed');
        }
        break;
      default:
        break;
    }
    return of(ev);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = req.url;
    const newReq = req.clone({ url });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        return of(event);
      })
      // catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }
}
