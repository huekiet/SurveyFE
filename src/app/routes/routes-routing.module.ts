import { AuthLayoutComponent } from './../layouts/auth-layout/auth-layout.component';
import { DoSurveyComponent } from './do-survey/do-survey.component';
import { UserLayoutComponent } from './../layouts/user-layout/user-layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },

  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'do-survey', component: DoSurveyComponent },
      // { path: 'display-result', component: DisplayResultComponent },
      { path: '**', redirectTo: 'do-survey' },
    ],
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [],
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
