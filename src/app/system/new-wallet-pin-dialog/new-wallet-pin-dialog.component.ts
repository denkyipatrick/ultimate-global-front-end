import { MatSnackBar } from '@angular/material/snack-bar';
import { DistributorService } from './../../services/distributor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-wallet-pin-dialog',
  templateUrl: './new-wallet-pin-dialog.component.html',
  styleUrls: ['./new-wallet-pin-dialog.component.scss']
})
export class NewWalletPinDialogComponent implements OnInit {
  form: FormGroup;
  isWorking: boolean;
  networkErrorMessage: string = '';
  validationErrorMessages: string[] = [];
  @Output() pinSet: EventEmitter<string>

  constructor(
    private dialogRef: MatDialogRef<NewWalletPinDialogComponent>,
    private distributorService: DistributorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isWorking = false;
    this.pinSet = new EventEmitter();

    this.form = new FormGroup({
      pin: new FormControl(),
      walletId: new FormControl(this.distributorService.distributor.wallet.id)
    });
  }

  ngOnInit(): void {
  }

  setPin() {
    if (this.form.invalid) { return; }

    this.isWorking = true;

    this.distributorService.setWalletPin(this.form.value.walletId, {
      pin: this.form.value.pin
    })
    .subscribe(_ => {
      this.isWorking = false;
      this.dialogRef.close();
      this.pinSet.emit(this.form.value.pin)
    }, error => {
      this.isWorking = false;
      switch(error.status) {
        case 0: {
          this.networkErrorMessage = "You may be offline.";
          break;
        }
        case 400: {
          this.validationErrorMessages = [];
          this.networkErrorMessage = "Validation errors";
          this.validationErrorMessages = error.error.errors.map(err => err.msg);
          break;
        }
        default: {
          this.networkErrorMessage = "Unexpected error has occurred.";
        }
      }
    });
  }

}
