import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Farm } from 'src/app/models/farm.model';
import { Plot } from 'src/app/models/plot.model';
import { FarmService } from 'src/app/services/farm/farm.service';
import { PlotService } from 'src/app/services/plot/plot.service';

@Component({
  selector: 'app-plots-edit',
  templateUrl: './plots-edit.component.html',
  styleUrls: ['./plots-edit.component.sass']
})
export class PlotsEditComponent implements OnInit, OnDestroy {

  public addPlotForm = new FormGroup({
    plotArea: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  public productionRegistryForm = new FormGroup({
    registry: new FormControl(0, [Validators.min(0)])
  });

  public plot: Plot;

  /**
   * Mantém a informação de quantos registros são
   * permitidos por Talhão. Por padrão, o valor inicial
   * será a quantidade de Talhões definida na criação
   * da Fazenda.
   */
  public maximumRegistriesAllowed: number = 0;

  private plotAreaSubscription!: Subscription | undefined;

  constructor(
    public dialogRef: MatDialogRef<PlotsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { farm: Farm },
    private farmService: FarmService,
    private plotService: PlotService
  ) {
    this.plot = new Plot(this.data.farm.plotQuantity);
    this.maximumRegistriesAllowed = this.data.farm.plotQuantity;
  }

  ngOnInit(): void {
    this.plotAreaSubscription = this.plotArea?.valueChanges.subscribe(value => this.plot.area = value);
  }

  ngOnDestroy(): void {
      if (this.plotAreaSubscription) {
        this.plotAreaSubscription.unsubscribe();
      }
  }

  get plotArea() { return this.addPlotForm.get('plotArea'); }

  get registry() { return this.productionRegistryForm.get('registry'); }

  public addNewPlot() {}

  public addPlotRegistry() {
    if (this.productionRegistryForm.valid) {
      this.plot.production.push(this.registry?.value);

      // Diminuimos a quantidade de registros permitida
      // assim que um novo registro é adicionado.
      this.maximumRegistriesAllowed -= 1;
    }

    this.productionRegistryForm.reset({ registry: 0 });
  }

  public removePlotRegistry(registryToDelete: number) {
    const index = this.plot.production.findIndex(registry => registry === registryToDelete);
    if (index > -1) {
      this.plot.production.splice(index, 1);

      // Aumentamos a quantidade de registros permitida
      // caso um registro seja excluído.
      this.maximumRegistriesAllowed += 1;
    }
  }

  public savePlotInfo() {
    if (this.addPlotForm.valid && this.plot.area) {
      this.data.farm.plots.push(this.plot);

      // Realiza o cálculo de produtividade em cada Talhão adicionado
      this.data.farm.plots.forEach((plot: Plot, index: number, array: Plot[]) => {
        array[index] = this.plotService.calculatePlotProductivity(plot);
      });

      // Atualiza a produtividade da Fazenda com base na produtividade dos Talhões
      this.data.farm = this.farmService.calculateFarmProductivity(this.data.farm);

      this.farmService
        .saveFarm(this.data.farm)
        .subscribe((saved: boolean) => saved ? this.dialogRef.close({ farm: this.data.farm }) : this.dialogRef.close(null));
    } else {
      this.plotArea?.updateValueAndValidity();
    }
  }

  public cancelEdition() {
    this.dialogRef.close(null);
  }

}
