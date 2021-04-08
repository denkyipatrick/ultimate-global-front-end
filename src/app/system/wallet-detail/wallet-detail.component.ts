import { WalletService } from './../../services/wallet.service';
import { DistributorService } from './../../services/distributor.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private distributorService: DistributorService, private walletService: WalletService) {
    this.wallet = this.distributorService?.distributor?.wallet;
  }

  ngOnInit(): void {
    // this.fetchWalletTransactions();
  }

  getTransactionDate(millis: number) {
    return new Date(millis).toDateString();
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
