import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm/farm.service';
import { PlotService } from 'src/app/services/plot/plot.service';

import { PlotsEditComponent } from './plots-edit.component';

describe('PlotsEditComponent', () => {
  let component: PlotsEditComponent;
  let fixture: ComponentFixture<PlotsEditComponent>;

  const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<PlotsEditComponent>>('MatDialogRef', ['close']);
  const farmServiceSpy = jasmine.createSpyObj<FarmService>('FarmService', ['saveFarm', 'calculateFarmProductivity']);
  const plotServiceSpy = jasmine.createSpyObj<PlotService>('PlotService', ['calculatePlotProductivity']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotsEditComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: FarmService, useValue: farmServiceSpy },
        { provide: PlotService, useValue: plotServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: { farm: new Farm('', 0) }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
