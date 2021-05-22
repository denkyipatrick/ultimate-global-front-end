import { MatSnackBar } from '@angular/material/snack-bar';
import { OkCancelDialogComponent } from './../ok-cancel-dialog/ok-cancel-dialog.component';
import { UtilityService } from './../../services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { DistributorService } from './../../services/distributor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  distributor: any;
  dateRegistered: string;

  showChangeNameForm: boolean;
  showChangePasswordForm: boolean;

  bankDetailForm: FormGroup;
  changeNameForm: FormGroup;
  contactDetailForm: FormGroup;
  nextOfKinDetailForm: FormGroup;

  changePasswordForm: FormGroup;

  isChangingName: boolean;
  isErrorChangingName: boolean;
  nameChangeErrorMessage: string;

  isShowBankForm: boolean;
  isChangingBankDetails: boolean;

  isShowContactForm: boolean;
  isChangingContactDetails: boolean;

  isShowNextOfKinForm: boolean;
  isChangingNextOfKinDetails: boolean;

  isChangingPassword: boolean;
  isErrorChangingPassword: boolean;
  passwordChangeErrorMessage: string;

  constructor(
    private distributorService: DistributorService, 
    private utilityService: UtilityService,
    private snackBar: MatSnackBar,
    private dialogOpener: MatDialog) {
    this.distributor = this.distributorService.distributor;
    this.dateRegistered = new Date(this.distributor?.createdAt).toDateString();

    this.changeNameForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl()
    });

    this.bankDetailForm = new FormGroup({
      bankName: new FormControl(this.distributor.bankName),
      swiftCode: new FormControl(this.distributor.swiftCode),
      accountNumber: new FormControl(this.distributor.accountNumber)
    });

    this.contactDetailForm = new FormGroup({
      phoneNumber: new FormControl(this.distributor.phoneNumber),
      emailAddress: new FormControl(this.distributor.emailAddress)
    });

    this.nextOfKinDetailForm = new FormGroup({
      name: new FormControl()
    });

    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl(),
      currentPassword: new FormControl(),
      confirmedPassword: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  toggleChangeNameForm() {
    this.showChangeNameForm = !this.showChangeNameForm;
  }
  
  toggleChangePasswordForm() {
    this.showChangePasswordForm = !this.showChangePasswordForm;
  }

  toggleBankForm() {
    this.isShowBankForm = !this.isShowBankForm;
  }

  toggleContactForm() {
    this.isShowContactForm = !this.isShowContactForm;
  }

  toggleNextOfKinForm() {
    this.isShowNextOfKinForm = !this.isShowNextOfKinForm;
  }

  changeName() {
    this.isChangingName = true;
    this.isErrorChangingName = false;
    this.nameChangeErrorMessage = "";

    this.distributorService.changeName(this.distributor.username, this.changeNameForm.value)
    .subscribe(newDistributor => {
      this.isChangingName = false;
      
      this.distributor.firstName = newDistributor.firstName;
      this.distributor.lastName = newDistributor.lastName;

      localStorage.setItem('distributor', JSON.stringify(this.distributor));
      this.showChangeNameForm = false;

      alert('You have successfully changed your name.');
    }, error => {
      this.isChangingName = false;

      switch(error.status) {
        case 0: {
          this.nameChangeErrorMessage = this.utilityService.connectionErrorMessage;
          break;
        }
        case 500: {
          this.nameChangeErrorMessage = this.utilityService.unexpectedErrorMessage;
          break;
        }
        default: {
          this.nameChangeErrorMessage = this.utilityService.unknownErrorMessage;
        }
      }
    });
  }

  changePassword() {
    if (this.changePasswordForm.invalid) { return; }

    if (this.changePasswordForm.value['newPassword'] !== 
      this.changePasswordForm.value['confirmedPassword']) {
        this.passwordChangeErrorMessage = "New and Repeated passwords are not equal.";
        return;
    }

    this.dialogOpener.open(OkCancelDialogComponent, {
      data: {
        title: "Change your Password",
        message: "Are you sure you want to change your password?",
        okButtonText: "CHANGE",
        cancelButtonText: "STOP"
      }
    })
    .componentInstance
    .accept
    .subscribe(() => {
      this.isChangingPassword = true;
      this.passwordChangeErrorMessage = "";
  
      this.distributorService.changePassword(this.distributor.username, this.changePasswordForm.value)
      .subscribe(newDistributor => {
        this.isChangingPassword = false;
        this.showChangePasswordForm = false;
        this.changePasswordForm.reset();
  
        alert('You have successfully changed your password.');
      }, error => {
        this.isChangingPassword = false;
  
        switch(error.status) {
          case 0: {
            this.passwordChangeErrorMessage = this.utilityService.connectionErrorMessage;
            break;
          }
          case 500: {
            this.passwordChangeErrorMessage = this.utilityService.unexpectedErrorMessage;
            break;
          }
          default: {
            this.passwordChangeErrorMessage = this.utilityService.unknownErrorMessage;
          }
        }
      });
    });
  }
  
  saveContactDetails() {
    this.isChangingContactDetails = true;

    if (this.contactDetailForm.invalid) { return; }

    this.distributorService.changeContactDetails(
      this.distributor.username, this.contactDetailForm.value
    )
    .subscribe(distributor => {
      this.isChangingContactDetails = false;

      this.distributorService.distributor.phoneNumber = distributor.phoneNumber;
      this.distributorService.distributor.emailAddress = distributor.emailAddress;

      this.isShowContactForm = false;

      localStorage.setItem('distributor', JSON.stringify(this.distributorService.distributor));
      this.snackBar.open('Contacts Details Changed', 'OK', {
        duration: 7000
      });
    }, error => {
      this.isChangingContactDetails = false;
      this.snackBar.open('Unable to Complete', 'TRY LATER', {
        duration: 7000
      });
    });
  }

  saveBankDetails() {
    if (this.bankDetailForm.invalid) { return; }

    this.isChangingBankDetails = true;

    this.distributorService.changeBankDetails(
      this.distributor.username, this.bankDetailForm.value
    )
    .subscribe(distributor => {
      this.isChangingBankDetails = false;

      this.distributor.bankName = distributor.bankName;
      this.distributor.swiftCode = distributor.swiftCode;
      this.distributor.accountNumber = distributor.accountNumber;

      this.distributorService.distributor.bankName = distributor.bankName;
      this.distributorService.distributor.swiftCode = distributor.swiftCode;
      this.distributorService.distributor.accountNumber = distributor.accountNumber;


      this.isShowBankForm = false;
      localStorage.setItem('distributor', JSON.stringify(this.distributorService.distributor));
    
      this.snackBar.open('Account Details Changed', 'OK', {
        duration: 7000
      });
    }, error => {
      this.isChangingBankDetails = false;
      this.snackBar.open('Unable to Complete', 'TRY LATER', {
        duration: 7000
      });
    });
  }

}
