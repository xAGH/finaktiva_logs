import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSwitcherComponent } from './card-switcher.component';

describe('CardSwitcherComponent', () => {
  let component: CardSwitcherComponent;
  let fixture: ComponentFixture<CardSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
