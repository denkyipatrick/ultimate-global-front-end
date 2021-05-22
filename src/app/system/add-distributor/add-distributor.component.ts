import { DistributorService } from './../../services/distributor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-distributor',
  templateUrl: './add-distributor.component.html',
  styleUrls: ['./add-distributor.component.scss']
})
export class AddDistributorComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = '';
  isCreatingDistributor: boolean = false;
  isErrorCreatingDistributor: boolean = false;

  countryList: string[] = ['Ghana', 'Nigeria', 'Togo'];
  cityList: string[] = ['Accra', 'Kumasi', 'Takoradi', 'Tamale'];

  constructor(private distributorService: DistributorService) {
    this.form = new FormGroup({
      dob: new FormControl(),
      city: new FormControl(),
      email: new FormControl(),
      country: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      lastName: new FormControl(),
      firstName: new FormControl(),
      phoneNumber: new FormControl(),
      upLineUsername: new FormControl(),
      sponsorUsername: new FormControl(this.distributorService.distributor.username),
      registrarSponsorUsername: new FormControl(this.distributorService.distributor.username)
    });
  }

  ngOnInit(): void {
  }

  addDistributor() {
    if (this.form.invalid || this.isCreatingDistributor) { return; }

    this.errorMessage = '';
    this.isCreatingDistributor = true;
    this.isErrorCreatingDistributor = false;

    if (confirm("Are you sure?")) {
      this.distributorService.addDistributor(this.form.value)
      .subscribe(distributor => {
        this.isCreatingDistributor = false;

        if (distributor.sponsorUsername === this.distributorService.distributor.username) {
          this.distributorService.distributor.wallet.balance -= 10;
          localStorage.setItem('distributor', JSON.stringify(this.distributorService.distributor));
        }

        alert('Distributor Successfully Created.');
        this.form.reset();
        this.form.markAsUntouched();
      }, error => {
        this.isCreatingDistributor = false;
        this.isErrorCreatingDistributor = true;

        switch(error.status) {
          case 400: {
            for (const singleError of error.error.errors) {
              this.errorMessage += singleError.msg + ' ';
            }
            break;
          }
          default: {
            this.errorMessage = "An unknown error occurred. Try again later."
          }
        }
      });
    }
  }

}
