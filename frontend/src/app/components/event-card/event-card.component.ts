import { Clipboard } from '@angular/cdk/clipboard';
import { DatePipe, NgClass } from '@angular/common';
import {
  Component,
  ComponentFactoryResolver,
  inject,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Color from 'color';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { EventModel } from '../../data/models/EventModel';
import { Severity, SeverityColors } from '../../data/models/SeverityColor';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [NgClass, DatePipe, SweetAlert2Module],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() event!: EventModel;
  clipboard = inject(Clipboard);
  toastr = inject(ToastrService);
  eventSrv = inject(EventService);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  copyToClipBoard(id: string) {
    this.clipboard.copy(id);
    this.toastr.info('Id copied to clipboard!');
  }

  getBackgroundColor(severity: Severity): string {
    return SeverityColors[severity];
  }

  colorIsDark(colorHexaCode: string) {
    return Color(colorHexaCode).isDark();
  }

  async deleteEvent(id: string) {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure to delete the event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });
    if (isConfirmed) {
      this.eventSrv.deleteEvent(id).subscribe({
        next: () => {
          this.eventSrv.events();
          this.toastr.success('Event deleted successfully', 'Event deleted');
        },
      });
    }
  }
}
