import { AddDistributorComponent } from './add-distributor/add-distributor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SystemComponent } from './system.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerationDetailComponent } from './generation-detail/generation-detail.component';

const routes: Routes = [
  { path: '', component: SystemComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-distributor', component: AddDistributorComponent },
    { path: 'distributors/:username/generation/:stage', component: GenerationDetailComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
