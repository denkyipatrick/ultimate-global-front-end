import { DistributorService } from './../../services/distributor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generation-detail',
  templateUrl: './generation-detail.component.html',
  styleUrls: ['./generation-detail.component.scss']
})
export class GenerationDetailComponent implements OnInit {
  selectedStageGeneration: string;
  generationDownLines: any[];
  distributorUsername: string;
  upLineGeneration: any;
  
  dpPhotoUrl: string = '../../../assets/images/dp_2.png'; 
  unAvailableDownLinePhotoUrl: string = '../../../assets/images/dp_black.png';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private distributorService: DistributorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.selectedStageGeneration = params['stage'];
      this.distributorUsername = params['username'];

      switch(this.selectedStageGeneration.toLowerCase()) {
        case 'starter': {
          this.dpPhotoUrl = '../../../assets/images/dp_red.png'; 
          break;
        }
        case 'leader': {
          this.dpPhotoUrl = '../../../assets/images/dp_light_blue.png'; 
          break;
        }
        case 'ruby': {
          this.dpPhotoUrl = '../../../assets/images/dp_dark_blue.png'; 
          break;
        }
      }

      this.loadLevelDownLines(this.selectedStageGeneration)
    });
  }

  viewDownLineGeneration(username: string) {
    location.href = `/system/distributors/${username}/generation/${this.selectedStageGeneration}`
    // this.router.navigate([`/distributors/${username}/generation/${this.selectedStageGeneration}`]);
  }

  loadLevelDownLines(stage: string) {
    this.distributorService.getDownLineGeneration(this.distributorUsername, stage)
    .subscribe(generation => {
      // console.log(generation);
      this.upLineGeneration = generation;
      this.generationDownLines = generation;
    }, error => {
      console.error(error);
    });
  }

}
