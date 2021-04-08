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
      sponsorUsername: new FormControl(this.distributorService.distributor.username)
    });
  }

  ngOnInit(): void {
  }

  addDistributor() {
    if (this.form.invalid) { return; }

    if (confirm("Are you sure?")) {
      this.distributorService.addDistributor(this.form.value)
      .subscribe(distributor => {
        alert('Distributor Successfully Created.');
        // this.form.reset();
      }, error => {
        console.error(error);
      });
    }
  }

}
