import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { TopNavBarComponent } from './shared/component/top-nav-bar/top-nav-bar.component';
import { RoutesModule } from './routes/routes.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './shared/component/about-us/about-us.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SideNavBarComponent } from './shared/component/side-nav-bar/side-nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    TopNavBarComponent,
    AuthLayoutComponent,
    AboutUsComponent,
    SideNavBarComponent,
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    CookieService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
