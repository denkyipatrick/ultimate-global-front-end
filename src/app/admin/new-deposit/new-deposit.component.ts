import { WalletService } from './../../services/wallet.service';
import { OkCancelDialogComponent } from './../../system/ok-cancel-dialog/ok-cancel-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DistributorService } from 'src/app/services/distributor.service';

@Component({
  selector: 'app-new-deposit',
  templateUrl: './new-deposit.component.html',
  styleUrls: ['./new-deposit.component.scss']
})
export class NewDepositComponent implements OnInit {
  wallet: any;
  selectedTransactionType: string;

  transactionForm: FormGroup;
  isTransactionError: boolean;
  isTransactionInProgress: boolean;
  transactionTypes: string[] = ["Deposit", "Withdrawal", "Transfer"]

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
  }

  createTransaction() {
    if (this.transactionForm.invalid) {
      return;
    }

    // this.dialogOpener.open(OkCancelDialogComponent, {
    //   disableClose: true,
    //   data: {
    //     title: `Make a ${this.selectedTransactionType}`,
    //     message: 'Are you sure you want to go on with this transaction?'
    //   }
    // })
    // .componentInstance
    // .accept
    // .subscribe(() => {
    //   this.isTransactionError = false;
    //   this.isTransactionInProgress = true;

    //   this.walletService.createTransaction(this.transactionForm.value)
    //   .subscribe(transaction => {
    //     this.isTransactionInProgress = false;
    //     this.snackBar.open('Transaction Completed', 'DONE');
    //   }, error => {
    //     this.isTransactionError = true;
    //     this.isTransactionInProgress = false;
        
    //     this.snackBar.open('Error Ocurred', 'CLOSE');
    //   });
    // });
  }
}
