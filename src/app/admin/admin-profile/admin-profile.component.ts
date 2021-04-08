import { UtilityService } from './../../services/utility.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  admin: any;

  nameForm: FormGroup;
  changingAdminName: boolean;
  nameFormErrorMessage: string;
  errorChangingAminName: boolean;

  passwordForm: FormGroup;
  changingAdminPassword: boolean;
  passwordFormErrorMessage: string;
  errorChangingAdminPassword: boolean;

  showNameForm: boolean;
  showPasswordForm: boolean;

  constructor(private adminService: AdminService, private utilityService: UtilityService) {
    this.admin = this.adminService.loggedInAdmin;

    this.nameForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl()
    });

    this.passwordForm = new FormGroup({
      newPassword: new FormControl(),
      currentPassword: new FormControl(),
      confirmedPassword: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  toggleShowNameForm() {
    this.showNameForm = !this.showNameForm;
  }

  toggleShowPasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
  }

  changeName() {
    if (this.nameForm.invalid || this.changingAdminName) { return; }

    this.changingAdminName = true;
    this.nameFormErrorMessage = "";
    this.errorChangingAminName = false;

    this.adminService.changeName(this.admin.username, this.nameForm.value)
    .subscribe(newAdmin => {
      alert("You have changed your full name");
      this.changingAdminName = false;

      this.admin.firstName = newAdmin.firstName;
      this.admin.lastName = newAdmin.lastName;
      this.adminService.loggedInAdmin = this.admin;
      localStorage.setItem('admin', JSON.stringify(this.admin));

      this.showNameForm = false;
    }, error => {
      this.changingAdminName = false;
      this.errorChangingAminName = true;

      switch(error.status) {
        case 0: {
          this.nameFormErrorMessage = this.utilityService.connectionErrorMessage;
          break;
        }
        case 500: {
          this.nameFormErrorMessage = this.utilityService.unexpectedErrorMessage;
          break;
        }
        default: {
          this.nameFormErrorMessage = this.utilityService.unknownErrorMessage;
        }
      }
    });
  }

  changePassword() {
    // if (this.passwordForm.invalid || this.changingAdminPassword) { return; }

    this.adminService.changePassword(this.admin.username, this.passwordForm.value)
    .subscribe(newAdmin => {
      this.changingAdminPassword = false;
      alert("You have changed your password");
      this.showPasswordForm = false;
    }, error => {
      // console.error(error);
      this.changingAdminPassword = false;
      this.errorChangingAdminPassword = true;

      switch(error.status) {
        case 0: {
          this.passwordFormErrorMessage = this.utilityService.connectionErrorMessage;
          break;
        }
        case 400: {
          this.passwordFormErrorMessage = "Your current password is not correct.";
          break;
        }
        case 404: {
          alert("Your account was not found. Contact your supervisor.")
          window.location.href = "/";
          break;
        }
        case 500: {
          this.passwordFormErrorMessage = this.utilityService.unexpectedErrorMessage;
          break;
        }
        default: {
          this.passwordFormErrorMessage = this.utilityService.unknownErrorMessage;
        }
      }
    });
  }

}
