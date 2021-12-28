import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FarmService } from 'src/app/services/farm/farm.service';

import { AddFarmComponent } from './add-farm.component';

describe('AddFarmComponent', () => {
  let component: AddFarmComponent;
  let fixture: ComponentFixture<AddFarmComponent>;

  const farmServiceSpy = jasmine.createSpyObj<FarmService>('FarmService', ['saveNewFarm']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFarmComponent ],
      providers: [
        { provide: FarmService, useValue: farmServiceSpy },
        MatSnackBar,
        Overlay
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFarmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
