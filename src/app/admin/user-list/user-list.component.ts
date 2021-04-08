import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  admins: any[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAdmins();
  }

  fetchAdmins() {
    this.adminService.fetchAdmins()
    .subscribe(admins => {
      this.admins = admins;
    }, error => {
      switch(error.status) {

      }
    });
  }

}
