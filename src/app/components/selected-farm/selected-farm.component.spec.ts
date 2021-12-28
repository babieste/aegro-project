import { Overlay } from '@angular/cdk/overlay';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FarmService } from 'src/app/services/farm/farm.service';

import { SelectedFarmComponent } from './selected-farm.component';

describe('SelectedFarmComponent', () => {
  let component: SelectedFarmComponent;
  let fixture: ComponentFixture<SelectedFarmComponent>;

  const farmServiceSpy = jasmine.createSpyObj<FarmService>('FarmService', ['saveNewFarm']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ SelectedFarmComponent ],
      providers: [
        { provide: FarmService, useValue: farmServiceSpy },
        MatDialog,
        Overlay
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFarmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
