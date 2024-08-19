import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { SeverityDropdownComponent } from '../../components/severity-dropdown/severity-dropdown.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { EventSeverity } from '../../data/enums/EventSeverity';
import { EventType } from '../../data/enums/EventType';
import { EventModel } from '../../data/models/EventModel';
import { EventService } from '../../services/event/event.service';
import { now, today } from '../../utils/date.utils';
import { eventSeverityEnumValidator } from '../../validators/eventSeverityEnumValidator';

@Component({
  selector: 'app-event-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    SpinnerComponent,
    SeverityDropdownComponent,
    ButtonComponent,
    NgOptimizedImage,
  ],
  templateUrl: './event-register.component.html',
  styleUrl: './event-register.component.scss',
})
export class EventRegisterComponent {
  now: string = '';
  today: string = '';
  eventForm: FormGroup;
  severityOptions: string[];
  selectedSeverity: EventSeverity | null = null;
  @Output() onSubmitEvent: EventEmitter<void> = new EventEmitter<void>();

  setFormDefaultValues() {
    this.eventForm.reset(this.eventForm.value);
    this.today = today();
    this.now = now();
    this.eventForm.get('date')!.setValue(this.today);
    this.eventForm.get('time')!.setValue(this.now);
    this.eventForm.get('description')!.setValue('');
    this.eventForm.get('severity')!.setValue(null);
    this.selectedSeverity = null;
  }

  constructor(
    private toastr: ToastrService,
    private eventService: EventService
  ) {
    this.eventForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      severity: new FormControl('', [
        Validators.required,
        eventSeverityEnumValidator,
      ]),
    });
    this.setFormDefaultValues();
    this.severityOptions = Object.values(EventSeverity);
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      this.toastr.error('Invalid form data', 'Error');
      return;
    }
    const data: EventModel = this.eventForm.value;
    data.type = EventType.FORM;
    this.eventService.createEvent(data).subscribe({
      next: ({ status }) => {
        if (status) {
          this.toastr.success('Event saved successfully', 'Event saved');
          this.setFormDefaultValues();
          this.eventService.getEvents().subscribe();
          this.onSubmitEvent.emit();
        }
      },
    });
  }
}
