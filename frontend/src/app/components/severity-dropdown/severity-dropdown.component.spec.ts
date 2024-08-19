import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverityDropdownComponent } from './severity-dropdown.component';

describe('SeverityDropdownComponent', () => {
  let component: SeverityDropdownComponent;
  let fixture: ComponentFixture<SeverityDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeverityDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeverityDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
