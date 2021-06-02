import { DistributorService } from './../../services/distributor.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewWalletPinDialogComponent } from '../new-wallet-pin-dialog/new-wallet-pin-dialog.component';

@Component({
  selector: 'app-change-wallet-pin-dialog',
  templateUrl: './change-wallet-pin-dialog.component.html',
  styleUrls: ['./change-wallet-pin-dialog.component.scss']
})
export class ChangeWalletPinDialogComponent implements OnInit {
  form: FormGroup;
  isWorking: boolean;
  networkErrorMessage: string = '';
  validationErrorMessages: string[] = [];
  @Output() pinChanged: EventEmitter<string>

  constructor(
    private dialogRef: MatDialogRef<NewWalletPinDialogComponent>,
    private distributorService: DistributorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isWorking = false;
    this.pinChanged = new EventEmitter();

    this.form = new FormGroup({
      newPin: new FormControl(),
      currentPin: new FormControl(),
      repeatedPin: new FormControl(),
      walletId: new FormControl(this.distributorService.distributor.wallet.id)
    });
  }

  ngOnInit(): void {
  }

  changePin() {
    if (this.form.invalid) { return; }

    if (this.form.value['newPin'] !== this.form.value['repeatedPin']) {
      this.networkErrorMessage = "New and repeated pins are not the same.";
      return;
    }

    this.isWorking = true;

    this.distributorService.changeWalletPin(this.form.value.walletId, {
      newPin: this.form.value.newPin,
      currentPin: this.form.value.currentPin
    })
    .subscribe(_ => {
      this.isWorking = false;
      this.dialogRef.close();
      this.pinChanged.emit(this.form.value.newPin)
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
