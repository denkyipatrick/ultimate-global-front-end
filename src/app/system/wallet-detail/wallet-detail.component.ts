import { MatDialog } from '@angular/material/dialog';
import { WalletService } from './../../services/wallet.service';
import { DistributorService } from './../../services/distributor.service';
import { Component, OnInit } from '@angular/core';
import { NewWalletPinDialogComponent } from '../new-wallet-pin-dialog/new-wallet-pin-dialog.component';
import { OkDialogComponent } from '../ok-dialog/ok-dialog.component';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.scss']
})
export class WalletDetailComponent implements OnInit {
  wallet: any;
  transactions: any[];
  depositTransactions: any[];
  withdrawalTransactions: any[];

  constructor(
    private distributorService: DistributorService,
    private walletService: WalletService,
    private dialogOpener: MatDialog
  ) {
    this.wallet = this.distributorService?.distributor?.wallet;
  }

  ngOnInit(): void {
    // this.fetchWalletTransactions();
  }

  getTransactionDate(millis: number) {
    return new Date(millis).toDateString();
  }

  changePin() {
    this.dialogOpener.open(NewWalletPinDialogComponent, {
      data: {
        walletId: this.distributorService.distributor.wallet.id
      }
    })
    .componentInstance
    .pinSet
    .subscribe(newPin => {
      this.wallet.pin = newPin;
      this.distributorService.distributor.wallet = this.wallet;
      localStorage.setItem('distributor', JSON.stringify(this.distributorService.distributor));

      this.dialogOpener.open(OkDialogComponent, {
        data: {
          title: "Wallet Pin Set",
          message: "You have successfully set a pin on your wallet."
        }
      })
    });
  }

  fetchWalletTransactions() {
    this.walletService.fetchWalletTransactions(
      this.distributorService.distributor.wallet.id
    )
    .subscribe(transactions => {
      this.transactions = transactions;
      this.depositTransactions = this.transactions
        .filter(transaction => transaction.type === 'deposit');
      
      this.withdrawalTransactions = this.transactions
        .filter(transaction => transaction.type === 'withdrawal');
      console.log(transactions);
    }, error => {
      console.error(error);
    });
  }

}
