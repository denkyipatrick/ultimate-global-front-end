import { DistributorService } from 'src/app/services/distributor.service';
import { Router } from '@angular/router';
import { UtilityService } from './../services/utility.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  appTitleBarName: string = environment.appName;

  authError: string = '';
  isAuthenticating: boolean = false;
  isErrorAuthenticating: boolean = false; 

  constructor(
    private utilityService: UtilityService,
    private DistributorService: DistributorService,
    private router: Router) {
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

    this.authError = '';
    this.isAuthenticating = true;
    this.isErrorAuthenticating = false;

    this.utilityService.authenticateDistributor(
      this.form.value['username'], this.form.value['password'])
    .subscribe(authPayload => {
      this.isAuthenticating = false;
      this.DistributorService.distributor = authPayload.distributor;
      localStorage.setItem('distributor', JSON.stringify(authPayload.distributor));
      localStorage.setItem('latest-news', JSON.stringify(authPayload.latestNews));
      this.router.navigate(['/system/dashboard']);
    }, error => {
      this.isAuthenticating = false;
      this.isErrorAuthenticating = true;

      switch(error.status) {
        case 404: 
        case 400: {
          this.authError = "Your username or password is not correct."
          break;
        }
        case 500: {
          this.authError = "Unknown error has occurred. Please try again later."
        }
      }
      
      console.error(error);
    });
  }

}
