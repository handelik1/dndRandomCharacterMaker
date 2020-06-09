import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterClassComponent } from './character-class.component';

describe('CharacterClassComponent', () => {
  let component: CharacterClassComponent;
  let fixture: ComponentFixture<CharacterClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
