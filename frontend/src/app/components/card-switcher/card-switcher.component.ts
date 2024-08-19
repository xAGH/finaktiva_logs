import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-switcher',
  standalone: true,
  imports: [],
  templateUrl: './card-switcher.component.html',
  styleUrl: './card-switcher.component.scss',
})
export class CardSwitcherComponent {
  @Input() text: string = '';
  @Input() pointintRight: boolean = true;
  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }
}
