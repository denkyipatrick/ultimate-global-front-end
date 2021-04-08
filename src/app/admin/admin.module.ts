import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { WalletTransactionsComponent } from './wallet-transactions/wallet-transactions.component';
import { DepositTransactionsComponent } from './deposit-transactions/deposit-transactions.component';
import { WithdrawalTransactionsComponent } from './withdrawal-transactions/withdrawal-transactions.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { NewDepositComponent } from './new-deposit/new-deposit.component';
import { MatSelectModule } from '@angular/material/select';
import { MessagingComponent } from './messaging/messaging.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';


@NgModule({
  declarations: [
    AdminComponent, 
    SignInComponent, 
    WalletTransactionsComponent, 
    DepositTransactionsComponent, 
    WithdrawalTransactionsComponent, 
    CreateUserComponent, 
    UserListComponent, 
    AdminProfileComponent, 
    TransactionDetailComponent, 
    NewDepositComponent, MessagingComponent, MessageDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatFormFieldModule
  ]
})
export class AdminModule { }
