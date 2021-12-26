import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm/farm.service';

@Component({
  selector: 'app-selected-farm',
  templateUrl: './selected-farm.component.html',
  styleUrls: ['./selected-farm.component.sass']
})
export class SelectedFarmComponent implements OnInit, OnDestroy {

  public selectedFarm: Farm | null = null;

  private selectedFarm$!: Subscription;

  constructor(private farmService: FarmService) {}

  ngOnInit(): void {
    this.selectedFarm$ = this.farmService
      .selectFarm()
      .subscribe((farm: Farm | null) => this.selectedFarm = farm);
  }

  ngOnDestroy(): void {
    if (this.selectedFarm$) {
      this.selectedFarm$.unsubscribe();
    }
  }

}
