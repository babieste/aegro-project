import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm/farm.service';
import { PlotsEditComponent } from '../plots-edit/plots-edit.component';

@Component({
  selector: 'app-selected-farm',
  templateUrl: './selected-farm.component.html',
  styleUrls: ['./selected-farm.component.sass']
})
export class SelectedFarmComponent implements OnInit, OnDestroy {

  public selectedFarm: Farm | null = null;

  private selectedFarm$!: Subscription;

  constructor(
    private farmService: FarmService,
    private dialog: MatDialog
  ) {}

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

  public openPlotEditionDialog(): void {
    const dialogRef = this.dialog.open(PlotsEditComponent, {
      data: {
        farm: this.selectedFarm
      },
      width: '500px'
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { farm: Farm } | null) => {
        if (result) {
          // Atualiza o componente com o resultado da edição
          this.farmService.selectFarmId = result.farm.id as string;
        }
      });
  }

}
