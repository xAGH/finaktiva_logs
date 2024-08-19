import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [NgClass, EventCardComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {
  eventSrv = inject(EventService);
  toastrSrv = inject(ToastrService);

  constructor() {
    this.eventSrv.getEvents();
  }
}
