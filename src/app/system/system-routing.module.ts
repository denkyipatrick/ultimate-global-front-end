import { MessagingComponent } from './messaging/messaging.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { WalletTransactionsComponent } from './wallet-transactions/wallet-transactions.component';
import { NewDepositComponent } from './new-deposit/new-deposit.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { WalletDetailComponent } from './wallet-detail/wallet-detail.component';
import { AddDistributorComponent } from './add-distributor/add-distributor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SystemComponent } from './system.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerationDetailComponent } from './generation-detail/generation-detail.component';

const routes: Routes = [
  { path: 'system', component: SystemComponent, children: [
    { path: 'profile', component: ProfileDetailComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'e-wallet', component: WalletDetailComponent },
    { path: 'transactions', component: WalletTransactionsComponent },
    { path: 'contact-admin', component: MessagingComponent },
    { path: 'new-transaction', component: NewTransactionComponent },
    { path: 'new-transaction/deposit', component: NewDepositComponent },
    { path: 'add-distributor', component: AddDistributorComponent },
    { path: 'distributors/:username/generation/:stage', component: GenerationDetailComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
