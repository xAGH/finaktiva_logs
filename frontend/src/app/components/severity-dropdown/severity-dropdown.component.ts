import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventSeverity } from '../../data/enums/EventSeverity';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-severity-dropdown',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './severity-dropdown.component.html',
  styleUrl: './severity-dropdown.component.scss',
})
export class SeverityDropdownComponent {
  @Input() formGroup!: FormGroup;
  @Input() label: string | null = 'Severity';
  selectedSeverity: EventSeverity | null = null;
  severityOptions: string[] = Object.values(EventSeverity);

  getSeverityError() {
    const errors = this.formGroup.get('severity')?.errors;
    if (errors?.['required']) {
      return 'Severity is required.';
    }
    if (errors?.['enumInvalid']) {
      return `Severity must be one of ${Object.values(EventSeverity)}`;
    }
    return '';
  }

  get severityInvalid() {
    return this.formGroup.get('severity')?.invalid;
  }

  onSeveritySelected(option: string) {
    const severity: EventSeverity =
      EventSeverity[option as keyof typeof EventSeverity];
    this.selectedSeverity = EventSeverity[EventSeverity[severity]];
    this.formGroup.get('severity')!.setValue(option);
  }
}
