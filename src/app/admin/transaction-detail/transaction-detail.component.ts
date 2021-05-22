import { Title } from '@angular/platform-browser';
import { UtilityService } from './../../services/utility.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  transactionId: string;
  transaction: any;
  transactionDate: string;

  isFetchingTransaction: boolean;
  isErrorFetchingTransaction: boolean;

  isSettingAsPaid: boolean;
  isErrorSettingAsPaid: boolean;

  constructor(
    private adminService: AdminService, 
    private utilityService: UtilityService, 
    private title: Title,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.transactionId = params['transaction-id'];

      this.fetchTransaction();
    });
  }

  setAsPaid() {
    if (!confirm("Are you sure about this action?")) { return; }

    this.isSettingAsPaid = true;
    this.isErrorSettingAsPaid = false;

    this.adminService.setTransactionAsPaid(this.transaction.id)
    .subscribe(transaction => {
      this.transaction.isProcessed = true;

      alert("Successful");
    }, error => {      
      this.isSettingAsPaid = true;
      this.isErrorSettingAsPaid = false;

      switch(error.status) {
        case 0: {
          break;
        }
        case 500: {
          break;
        }
        default: {
          
        }
      }
    });
  }

  fetchTransaction() {
    this.isFetchingTransaction = true;
    this.isErrorFetchingTransaction = false;

    this.adminService.fetchTransaction(this.transactionId)
    .subscribe(transaction => {
      // console.log(transaction);

      this.transactionDate = new Date(transaction.createdAt).toDateString();
      this.isFetchingTransaction = false;
      this.transaction = transaction;
    }, error => {
      this.isFetchingTransaction = false;
      this.isErrorFetchingTransaction = true;

      console.error(error);
    });
  }

}
