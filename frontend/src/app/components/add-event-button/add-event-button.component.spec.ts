import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventButtonComponent } from './add-event-button.component';

describe('AddEventButtonComponent', () => {
  let component: AddEventButtonComponent;
  let fixture: ComponentFixture<AddEventButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
