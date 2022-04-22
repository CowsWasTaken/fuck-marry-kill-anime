import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSelectionComponent } from './status-selection.component';

describe('StatusSelectionComponent', () => {
  let component: StatusSelectionComponent;
  let fixture: ComponentFixture<StatusSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
