import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotsEditComponent } from './plots-edit.component';

describe('PlotsEditComponent', () => {
  let component: PlotsEditComponent;
  let fixture: ComponentFixture<PlotsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
