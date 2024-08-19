import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AddEventButtonComponent } from '../../components/add-event-button/add-event-button.component';
import { CardSwitcherComponent } from '../../components/card-switcher/card-switcher.component';
import { CardComponent } from '../../components/card/card.component';
import { EventListComponent } from '../../containers/event-list/event-list.component';
import { EventRegisterComponent } from '../../containers/event-register/event-register.component';
import { EventSearchComponent } from '../../containers/event-search/event-search.component';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EventListComponent,
    EventRegisterComponent,
    EventSearchComponent,
    CardComponent,
    NgClass,
    CardSwitcherComponent,
    AddEventButtonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  eventSrv = inject(EventService);
  showRightCard = false;

  ngOnInit() {
    this.eventSrv.getEvents().subscribe({});
  }

  switchCard() {
    this.showRightCard = !this.showRightCard;
  }
}
