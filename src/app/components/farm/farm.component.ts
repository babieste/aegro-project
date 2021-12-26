import { Component, Input, OnInit } from '@angular/core';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm/farm.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.sass']
})
export class FarmComponent implements OnInit {

  @Input() farm!: Farm;

  constructor(private farmService: FarmService) { }

  ngOnInit(): void { }

  public selectFarm() {
    this.farmService.selectFarmId = this.farm.id
  }

}
