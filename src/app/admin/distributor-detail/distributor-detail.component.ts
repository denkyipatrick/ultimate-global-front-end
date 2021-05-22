import { UtilityService } from './../../services/utility.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distributor-detail',
  templateUrl: './distributor-detail.component.html',
  styleUrls: ['./distributor-detail.component.scss']
})
export class DistributorDetailComponent implements OnInit {
  distributor: any;
  distributorUsername: string;

  isChangingName: boolean;
  isErrorChangingName: boolean;

  showChangeNameForm: boolean;
  changeNameForm: FormGroup;
  nameChangeErrorMessage: string;

  constructor(
    private distributorService: DistributorService,
    private utilityService: UtilityService,
    private adminService: AdminService, 
    private route: ActivatedRoute) {
      this.changeNameForm = new FormGroup({
        lastName: new FormControl(),
        firstName: new FormControl()
      });
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.distributorUsername = params['username'];
      this.fetchDistributor();
    });
  }

  fetchDistributor() {
    this.adminService.fetchDistributor(this.distributorUsername)
    .subscribe(distributor => {
      this.distributor = distributor;
      this.changeNameForm.patchValue({
        lastName: distributor.lastName,
        firstName: distributor.firstName
      })
    }, error => {

    });
  }
  
  toggleChangeNameForm() {
    this.showChangeNameForm = !this.showChangeNameForm;
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
}
