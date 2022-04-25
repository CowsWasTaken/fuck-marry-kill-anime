import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDescriptionCardComponent } from './character-description-card.component';

describe('CharacterDescriptionCardComponent', () => {
  let component: CharacterDescriptionCardComponent;
  let fixture: ComponentFixture<CharacterDescriptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterDescriptionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDescriptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
