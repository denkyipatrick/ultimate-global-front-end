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
  loggedInDistributor: any;
  generationDownLines: any[];

  constructor(private utilityService: UtilityService, 
    private distributorService: DistributorService,
    private router: Router 
    ) {
    this.loggedInDistributor = distributorService.distributor;
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
    location.href = `/distributors/${this.loggedInDistributor.username}/generation/${stage}`
  }

}
