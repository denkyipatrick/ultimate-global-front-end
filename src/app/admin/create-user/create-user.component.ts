import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  isCreatingAdmin: boolean;
  isErrorCreatingAdmin: boolean;
  adminNetworkErrorMessage: string;

  createAdminForm:FormGroup;

  constructor(private adminService: AdminService) {
    this.createAdminForm = new FormGroup({
      lastName: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      firstName: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  createAdmin() {

    if (this.createAdminForm.invalid) { return; }

    if (!confirm("Are you sure you want to create this admin?")) {
      return;
    }



    this.isCreatingAdmin = true;
    this.isErrorCreatingAdmin = false;
    this.adminNetworkErrorMessage = "";

    this.adminService.createAdmin(this.createAdminForm.value)
    .subscribe(newAdmin => {
      this.isCreatingAdmin = false;
      console.log(newAdmin);
      alert("You have successfully created the admin");
    }, error => {
      this.isCreatingAdmin = false;
      this.isErrorCreatingAdmin = true;

      console.error(error);

      switch(error.status) {
        case 0: {
          this.adminNetworkErrorMessage = "Please check your connection and try again.";
          break;
        }
        case 500: {
          this.adminNetworkErrorMessage = "Unexpected error. Please try again later.";
          break;
        }
        default: {
          this.adminNetworkErrorMessage = "Unknown error. Please try again later.";
        }
      }
    });
  }

}
