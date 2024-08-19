import { AbstractControl, ValidationErrors } from '@angular/forms';
import { EventSeverity } from '../data/enums/EventSeverity';

export function eventSeverityEnumValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!Object.values(EventSeverity).includes(control.value)) {
    return { enumInvalid: true };
  }
  return null;
}
