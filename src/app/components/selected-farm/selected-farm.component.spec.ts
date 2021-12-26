import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFarmComponent } from './selected-farm.component';

describe('SelectedFarmComponent', () => {
  let component: SelectedFarmComponent;
  let fixture: ComponentFixture<SelectedFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedFarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
