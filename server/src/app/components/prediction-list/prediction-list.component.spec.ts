import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionListComponent } from './prediction-list.component';

describe('PredictionListComponent', () => {
  let component: PredictionListComponent;
  let fixture: ComponentFixture<PredictionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
