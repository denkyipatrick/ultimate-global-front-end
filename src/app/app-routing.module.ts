import { SystemComponent } from './system/system.component';
// import { GenerationDetailComponent } from './generation-detail/generation-detail.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },  
  { path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule) },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { relativeLinkResolution: 'legacy', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
