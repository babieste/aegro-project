import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm/farm.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.sass']
})
export class FarmsComponent implements OnInit {

  public farms$: Observable<Farm[]>;

  constructor(private farmService: FarmService) {
    this.farms$ = this.farmService.getFarms();
  }

  ngOnInit(): void {}

}
