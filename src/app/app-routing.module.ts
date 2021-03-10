import { SystemComponent } from './system/system.component';
// import { GenerationDetailComponent } from './generation-detail/generation-detail.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule) }
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'distributors/:username/generation/:stage', component: GenerationDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
