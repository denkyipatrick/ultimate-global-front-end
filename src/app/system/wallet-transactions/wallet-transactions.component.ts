import { WalletService } from './../../services/wallet.service';
import { DistributorService } from './../../services/distributor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.scss']
})
export class WalletTransactionsComponent implements OnInit {
  transactions: any[];
  depositTransactions: any[];
  transferTransactions: any[];
  withdrawalTransactions: any[];

  constructor(
    private distributorService: DistributorService, 
    private walletService: WalletService) {
    // this.wallet = this.distributorService
  }

  ngOnInit(): void {
    this.fetchWalletTransactions();
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
      
      this.transferTransactions = this.transactions
        .filter(transaction => transaction.type === 'transfer');
      console.log(transactions);
    }, error => {
      console.error(error);
    });
  }

}
