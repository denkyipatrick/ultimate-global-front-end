import { AdminService } from './../../services/admin.service';
import { UtilityService } from './../../services/utility.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.scss']
})
export class AdminSignInComponent implements OnInit {
  isSigningIn: boolean;
  isErrorSigningIn: boolean;
  networkErrorMessage: string;

  signInForm: FormGroup;

  constructor(private adminService: AdminService, private utilityService: UtilityService) {
    this.signInForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  signIn() {
    if (this.signInForm.invalid) { return; }

    this.isSigningIn = true;
    this.isErrorSigningIn = false;
    this.networkErrorMessage = "";

    this.adminService.signInAdmin(
      this.signInForm.value['username'], 
      this.signInForm.value['password'])
    .subscribe(adminAuthPayload => {
      localStorage.setItem('admin', JSON.stringify(adminAuthPayload));
      this.adminService.loggedInAdmin = adminAuthPayload;

      this.isSigningIn = false;
      window.location.href = "/admin/users";
    }, error => {
      this.isSigningIn = false;
      this.isErrorSigningIn = true;

      switch(error.status) {
        case 0: {
          this.networkErrorMessage = "Check your connection and try again.";
          break;
        }
        case 400: {
          this.networkErrorMessage = "Your password may be wrong.";
          break;
        }
        case 404: {
          this.networkErrorMessage = "Your account was not found or has been disabled.";
          break;
        }
        case 500: {
          this.networkErrorMessage = "Unexpected error, please try again later.";
          break;
        }
        default: {
          this.networkErrorMessage = "Unknown error, please try again later.";
        }
      }
    });
  }

}
