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

  constructor(private distributorService: DistributorService) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      lastName: new FormControl(),
      firstName: new FormControl(),
      phoneNumber: new FormControl(),
      upLineUsername: new FormControl(),
      sponsorUsername: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  addDistributor() {
    if (this.form.invalid) { return; }

    if (confirm("Are you sure?")) {
      this.form.patchValue({ 'sponsorUsername': this.distributorService.distributor.username })
      this.distributorService.addDistributor(this.form.value)
      .subscribe(distributor => {
        console.log(distributor);
        alert('Distributor Successfully Created.');
      }, error => {
        console.error(error);
      });
    }
  }

}
