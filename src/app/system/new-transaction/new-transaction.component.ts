import { WalletService } from './../../services/wallet.service';
import { DistributorService } from './../../services/distributor.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OkCancelDialogComponent } from '../ok-cancel-dialog/ok-cancel-dialog.component';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {
  wallet: any;
  selectedTransactionType: string;

  transactionForm: FormGroup;
  isTransactionError: boolean;
  isTransactionInProgress: boolean;
  transactionTypes: string[] = ["Withdrawal", "Transfer"]

  constructor(
    private snackBar: MatSnackBar,
    private dialogOpener: MatDialog,
    private walletService: WalletService,
    private distributorService: DistributorService) {
    this.selectedTransactionType = this.transactionTypes[0];
    this.wallet = this.distributorService.distributor?.wallet;
  
    this.transactionForm = new FormGroup({
      amount: new FormControl(),
      walletId: new FormControl(this.wallet.id),
      type: new FormControl(this.selectedTransactionType),
      transferReceiverUsername: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  transactionTypeChanged(type: string) {
    this.selectedTransactionType = type;
    console.log(type);
  }

  createTransaction() {
    if (this.transactionForm.invalid) {
      return;
    }

    this.dialogOpener.open(OkCancelDialogComponent, {
      disableClose: true,
      data: {
        title: `Make a ${this.selectedTransactionType}`,
        message: 'Are you sure you want to go on with this transaction?'
      }
    })
    .componentInstance
    .accept
    .subscribe(() => {
      this.isTransactionError = false;
      this.isTransactionInProgress = true;

      this.walletService.createTransaction(this.transactionForm.value)
      .subscribe(transaction => {
        this.isTransactionInProgress = false;
        this.snackBar.open('Transaction Completed', 'DONE');
      }, error => {
        this.isTransactionError = true;
        this.isTransactionInProgress = false;
        
        this.snackBar.open('Error Ocurred', 'CLOSE');
      });
    });
  }

}
