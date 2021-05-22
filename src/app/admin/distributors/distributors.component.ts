import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.scss']
})
export class DistributorsComponent implements OnInit {
  distributors: any[];
  selectedDistributorUsername: string;

  constructor(
    private adminService: AdminService, 
    private router: Router, 
    private route: ActivatedRoute) {
    this.selectedDistributorUsername = sessionStorage.getItem('selected-username');
  }

  ngOnInit(): void {
    this.fetchDistributors();
  }

  fetchDistributors() {
    this.adminService.fetchDistributors()
    .subscribe(distributors => {
      this.distributors = distributors;
      // this.selectedDistributorUsername = distributors[0].username;
      // this.router.navigate(['./', distributors[0].username], { relativeTo: this.route })
    }, error => {
    })
  }

  selected(username: string) {
    this.selectedDistributorUsername = username;
    sessionStorage.setItem('selected-username', username);
  }

}
