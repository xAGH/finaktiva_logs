import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventType } from '../../data/enums/EventType';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-type-dropdown',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './type-dropdown.component.html',
  styleUrl: './type-dropdown.component.scss',
})
export class TypeDropdownComponent {
  @Input() formGroup!: FormGroup;
  @Input() label: string | null = 'Severity';

  typeOptions: string[] = Object.values(EventType);
  selectedType: EventType | null = null;

  getTypeError() {
    const errors = this.formGroup.get('type')?.errors;
    if (errors?.['required']) {
      return 'Type is required.';
    }
    if (errors?.['enumInvalid']) {
      return `Type must be one of ${Object.values(EventType)}`;
    }
    return '';
  }

  get typeInvalid() {
    return this.formGroup.get('type')?.invalid;
  }

  onTypeSelected(option: string) {
    const type: EventType = EventType[option as keyof typeof EventType];
    this.selectedType = EventType[EventType[type]];
    this.formGroup.get('type')!.setValue(option);
  }
}
