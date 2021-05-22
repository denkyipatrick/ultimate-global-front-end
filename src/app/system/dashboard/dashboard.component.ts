import { Router } from '@angular/router';
import { DistributorService } from './../../services/distributor.service';
import { UtilityService } from './../../services/utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  levels: any[];
  distributor: any;
  latestNews: any;

  loggedInDistributor: any;
  generationDownLines: any[];

  constructor(private utilityService: UtilityService, 
    private distributorService: DistributorService,
    private router: Router 
    ) {
    this.distributor = this.distributorService.distributor;
    this.loggedInDistributor = distributorService.distributor;
    this.latestNews = JSON.parse(localStorage.getItem('latest-news'));
  }

  ngOnInit(): void {
    this.getDistributorLevels();
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
