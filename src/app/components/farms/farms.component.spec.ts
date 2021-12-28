import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmService } from 'src/app/services/farm/farm.service';

import { FarmsComponent } from './farms.component';

describe('FarmsComponent', () => {
  let component: FarmsComponent;
  let fixture: ComponentFixture<FarmsComponent>;

  const farmServiceSpy = jasmine.createSpyObj<FarmService>('FarmService', ['getFarms']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsComponent ],
      providers: [
        { provide: FarmService, useValue: farmServiceSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
