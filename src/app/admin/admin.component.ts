import { AdminService } from './../services/admin.service';
import { UtilityService } from './../services/utility.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admin: any;

  constructor(private title: Title, private adminService: AdminService) {
    this.admin = this.adminService.loggedInAdmin;
  }

  ngOnInit(): void {
    this.title.setTitle('Admin Panel | Ultimate Life Global');
  }

}
