import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FarmService } from 'src/app/services/farm/farm.service';

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.sass']
})
export class AddFarmComponent implements OnInit {

  public addFarmForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    plotQuantity: new FormControl(0, [Validators.min(0)]) //TODO number only
  });

  constructor(
    private farmService: FarmService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  get name() { return this.addFarmForm.get('name'); }

  get plotQuantity() { return this.addFarmForm.get('plotQuantity'); }

  public add() {
    //TODO add loading
    if(this.addFarmForm.valid) {
      this.farmService
        .addFarm(this.name?.value, this.plotQuantity?.value)
        .subscribe(
          (added: boolean) => {
            if (added) {
              this.snackBar.open('Fazenda adicionada com sucesso!', 'Fechar');
            } else {
              this.snackBar.open('Não foi possível adicionar a Fazenda. Tente Novamente.', 'Fechar');
            }

            this.addFarmForm.reset();
          }
        )
    }
  }

}
