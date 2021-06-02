import { Router } from '@angular/router';
import { DistributorService } from './../../services/distributor.service';
import { UtilityService } from './../../services/utility.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  levels: any[];
  latestNews: any;
  distributor: any;
  lastLoggedIn: string;
  recentDownLines: any[];
  totalDownLinesCount: number = 0;
  totalLeftDownLinesCount: number = 0;
  totalRightDownLinesCount: number = 0;

  loggedInDistributor: any;
  generationDownLines: any[];

  constructor(private utilityService: UtilityService, 
    private distributorService: DistributorService,
    private router: Router 
    ) {
    this.distributor = this.distributorService.distributor;
    this.loggedInDistributor = distributorService.distributor;
    this.latestNews = JSON.parse(localStorage.getItem('latest-news'));

    this.recentDownLines = JSON.parse(sessionStorage.getItem('recent-joining'));
    this.lastLoggedIn =  moment(this.loggedInDistributor.lastLogin).format("Do MMM YYYY hh:mm a");
  }

  ngOnInit(): void {
    this.fetchRecentDownLines();
    this.getDistributorLevels();
    this.fetchTotalDownLinesCount();
  }

  fetchRecentDownLines() {
    this.distributorService.fetchRecentDownLines()
    .subscribe(downLines => {
      this.recentDownLines = downLines;
      sessionStorage.setItem('recent-joining', JSON.stringify(downLines));
    }, error => {

    });
  }

  fetchTotalDownLinesCount() {
    this.distributorService.fetchLeftRightTotalDownLinesCounts()
    .subscribe(data => {
      console.log(data);
      this.totalDownLinesCount = data.totalCount;
      this.totalLeftDownLinesCount = data.leftCount;
      this.totalRightDownLinesCount = data.rightCount;
    });
  }

  getDistributorLevels() {
    this.utilityService.getDistributorLevels()
    .subscribe(levels => {
      this.levels = levels;
    }, error => {
      console.error(error);
    });
  }

  loadLevelDownLines(stage: string) {
    console.log(stage);
    this.router.navigate([`/distributors/${this.loggedInDistributor.username}/generation/${stage}`])

    // this.distributorService.getDownLineGeneration(stage)
    // .subscribe(generation => {
    //   console.log(generation);
    //   this.generationDownLines = generation;
    // }, error => {
    //   console.error(error);
    // });
  }

}
