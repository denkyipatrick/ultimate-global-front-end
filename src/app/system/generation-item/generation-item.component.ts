import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generation-item',
  templateUrl: './generation-item.component.html',
  styleUrls: ['./generation-item.component.scss']
})
export class GenerationItemComponent implements OnInit {
  @Input() distributor: any;
  @Input() selectedStage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
