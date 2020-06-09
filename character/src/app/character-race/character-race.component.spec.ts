import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterRaceComponent } from './character-race.component';

describe('CharacterRaceComponent', () => {
  let component: CharacterRaceComponent;
  let fixture: ComponentFixture<CharacterRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
