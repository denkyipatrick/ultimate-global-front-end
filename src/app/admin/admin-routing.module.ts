import { DistributorDetailComponent } from './distributor-detail/distributor-detail.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { GeneralMessagingComponent } from './general-messaging/general-messaging.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessagingComponent } from './messaging/messaging.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { WithdrawalTransactionsComponent } from './withdrawal-transactions/withdrawal-transactions.component';
import { DepositTransactionsComponent } from './deposit-transactions/deposit-transactions.component';
import { WalletTransactionsComponent } from './wallet-transactions/wallet-transactions.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDepositComponent } from './new-deposit/new-deposit.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'sign-in', component: SignInComponent },
    { path: 'users', component: UserListComponent },
    { path: 'distributors', component: DistributorsComponent, children: [      
      { path: ':username', component: DistributorDetailComponent },
    ] },
    { path: 'profile', component: AdminProfileComponent },
    { path: 'general-messaging', component: GeneralMessagingComponent },
    { path: 'messages', component: MessagingComponent, children: [
      { path: ':id', component: MessageDetailComponent }
    ] },
    // { path: 'messages/:id', component: MessageDetailComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'make-a-deposit', component: NewDepositComponent },
    { path: 'wallet-transactions', component: WalletTransactionsComponent, children: [
      { path: 'deposit', component: DepositTransactionsComponent },
      { path: 'withdrawals', component: WithdrawalTransactionsComponent }
    ]},
    { path: 'wallet-transactions/:transaction-id', component: TransactionDetailComponent },
    { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
