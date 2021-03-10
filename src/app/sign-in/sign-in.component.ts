import { Router } from '@angular/router';
import { UtilityService } from './../services/utility.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  isAuthenticating: boolean;
  isErrorAuthenticating: boolean; 

  constructor(private utilityService: UtilityService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    localStorage.clear();
  }

  ngOnInit(): void {
  }

  signIn() {
    if (this.form.invalid) { return; }

    console.log(this.form.value);

    this.isAuthenticating = true;
    this.isErrorAuthenticating = false;

    this.utilityService.authenticateDistributor(
      this.form.value['username'], this.form.value['password'])
    .subscribe(dist => {
      this.isAuthenticating = false;
      console.log(dist);
      localStorage.setItem('distributor', JSON.stringify(dist));
      this.router.navigate(['/dashboard']);
    }, error => {
      this.isAuthenticating = false;
      this.isErrorAuthenticating = true;
      
      console.error(error);
    });
  }

}
