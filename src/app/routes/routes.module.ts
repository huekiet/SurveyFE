import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DoSurveyComponent } from './do-survey/do-survey.component';
import { RegisterComponent } from './register/register.component';
import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, DoSurveyComponent , RegisterComponent, ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
