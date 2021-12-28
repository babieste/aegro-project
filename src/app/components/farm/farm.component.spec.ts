import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmService } from 'src/app/services/farm/farm.service';

import { FarmComponent } from './farm.component';

describe('FarmComponent', () => {
  let component: FarmComponent;
  let fixture: ComponentFixture<FarmComponent>;

  const farmServiceSpy = jasmine.createSpyObj<FarmService>('FarmService', ['selectFarmId']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmComponent ],
      providers: [
        { provide: FarmService, useValue: farmServiceSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });
});
