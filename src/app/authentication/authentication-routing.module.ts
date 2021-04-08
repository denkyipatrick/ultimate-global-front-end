import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { AuthenticationComponent } from './authentication.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  component: AuthenticationComponent, children: [
    {path: 'admin-sign-in', component: AdminSignInComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
