import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StageDownLinesComponent } from './stage-down-lines/stage-down-lines.component';
import { GenerationItemComponent } from './generation-item/generation-item.component';
import { GenerationDetailComponent } from './generation-detail/generation-detail.component';
import { AddDistributorComponent } from './add-distributor/add-distributor.component';


@NgModule({
  declarations: [
    SystemComponent,
    DashboardComponent,
    StageDownLinesComponent,
    GenerationItemComponent,
    GenerationDetailComponent,
    AddDistributorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    ReactiveFormsModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
