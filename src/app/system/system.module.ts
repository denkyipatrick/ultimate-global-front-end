import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatTabsModule } from '@angular/material/tabs'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StageDownLinesComponent } from './stage-down-lines/stage-down-lines.component';
import { GenerationItemComponent } from './generation-item/generation-item.component';
import { GenerationDetailComponent } from './generation-detail/generation-detail.component';
import { AddDistributorComponent } from './add-distributor/add-distributor.component';
import { WalletDetailComponent } from './wallet-detail/wallet-detail.component';
import { WalletTransactionsComponent } from './wallet-transactions/wallet-transactions.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { NewDepositComponent } from './new-deposit/new-deposit.component';
import { NewWithdrawalComponent } from './new-withdrawal/new-withdrawal.component';
import { NewTransferComponent } from './new-transfer/new-transfer.component';
import { OkCancelDialogComponent } from './ok-cancel-dialog/ok-cancel-dialog.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessagingComponent } from './messaging/messaging.component';
import { NewWalletPinDialogComponent } from './new-wallet-pin-dialog/new-wallet-pin-dialog.component';
import { OkDialogComponent } from './ok-dialog/ok-dialog.component';
import { ChangeWalletPinDialogComponent } from './change-wallet-pin-dialog/change-wallet-pin-dialog.component';


@NgModule({
  declarations: [
    SystemComponent,
    DashboardComponent,
    StageDownLinesComponent,
    GenerationItemComponent,
    GenerationDetailComponent,
    AddDistributorComponent,
    WalletDetailComponent,
    WalletTransactionsComponent,
    NewTransactionComponent,
    NewDepositComponent,
    NewWithdrawalComponent,
    NewTransferComponent,
    OkCancelDialogComponent,
    ProfileDetailComponent,
    MessagingComponent,
    NewWalletPinDialogComponent,
    OkDialogComponent,
    ChangeWalletPinDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule, 
    MatDatepickerModule, 
    SystemRoutingModule
  ]
})
export class SystemModule { }
