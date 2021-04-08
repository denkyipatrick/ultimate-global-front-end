import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistributorService } from '../services/distributor.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  levels: any[];
  notifications: any[];

  isShowNotificationPopup: boolean;

  loggedInDistributor: any;
  generationDownLines: any[];

  constructor(private utilityService: UtilityService, 
    private distributorService: DistributorService,
    private router: Router 
    ) {
    this.loggedInDistributor = distributorService.distributor;
  }

  ngOnInit(): void {
    console.log(this.loggedInDistributor);
    this.getDistributorLevels();
    this.fetchNotifications();
  }

  toggleNotificationPopup() {
    this.isShowNotificationPopup = !this.isShowNotificationPopup;

    if (this.isShowNotificationPopup) {
      this.fetchNotifications();
    }
  }

  getDistributorLevels() {
    this.utilityService.getDistributorLevels()
    .subscribe(levels => {
      this.levels = levels;
    }, error => {
      console.error(error);
    });
  }

  fetchNotifications() {
    this.distributorService.fetchNotifications()
    .subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  loadLevelDownLines(stage: string) {
    location.href = `/distributors/${this.loggedInDistributor.username}/generation/${stage}`
  }

}
