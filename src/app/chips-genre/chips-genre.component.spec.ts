import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsGenreComponent } from './chips-genre.component';

describe('InputChipsComponent', () => {
  let component: ChipsGenreComponent;
  let fixture: ComponentFixture<ChipsGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsGenreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
