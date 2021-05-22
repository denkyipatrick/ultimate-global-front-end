import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
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
  appTitleBarName: string = environment.appName;

  isShowNotificationPopup: boolean;

  loggedInDistributor: any;
  generationDownLines: any[];

  constructor(
    private utilityService: UtilityService, 
    private distributorService: DistributorService
    ) {
    this.loggedInDistributor = distributorService.distributor;
  }

  ngOnInit(): void {
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
    location.href = `/system/distributors/${this.loggedInDistributor.username}/generation/${stage}`
  }

}
