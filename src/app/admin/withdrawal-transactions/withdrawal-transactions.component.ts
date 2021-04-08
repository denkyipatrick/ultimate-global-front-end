import { UtilityService } from './../../services/utility.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdrawal-transactions',
  templateUrl: './withdrawal-transactions.component.html',
  styleUrls: ['./withdrawal-transactions.component.scss']
})
export class WithdrawalTransactionsComponent implements OnInit {
  transactions: any[];
  errorMessage: string;

  isFetchingTransactions: boolean;

  constructor(private adminService: AdminService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.isFetchingTransactions = true;

    this.adminService.fetchWithdrawalTransactions()
    .subscribe(transactions => {
      this.isFetchingTransactions = false;
      
      this.transactions = transactions.map(transaction => {
        transaction.date = new Date(transaction.createdAt).toDateString();
        return transaction;
      });
    }, error => {
      this.isFetchingTransactions = false;
      console.error(error);

      switch(error.status) {
        case 0: {
          this.errorMessage = this.utilityService.connectionErrorMessage;
          break;
        }
        case 500: {
          this.errorMessage = this.utilityService.unexpectedErrorMessage;
          break;
        }
        default: {
          this.errorMessage = this.utilityService.unknownErrorMessage;
        }
      }
    });
  }
}
