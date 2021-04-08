import { AdminService } from './../../services/admin.service';
import { UtilityService } from './../../services/utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit-transactions',
  templateUrl: './deposit-transactions.component.html',
  styleUrls: ['./deposit-transactions.component.scss']
})
export class DepositTransactionsComponent implements OnInit {
  transactions: any[];
  errorMessage: string;

  isFetchingTransactions: boolean;

  constructor(private adminService: AdminService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions() {
    this.isFetchingTransactions = true;

    this.adminService.fetchDepositTransactions()
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
