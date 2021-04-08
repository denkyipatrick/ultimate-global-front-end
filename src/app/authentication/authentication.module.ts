import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { AuthenticationComponent } from './authentication.component';


@NgModule({
  declarations: [AdminSignInComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
