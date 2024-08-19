import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      (click)="onClick()"
      [ngClass]="warn ? 'bg-warn' : 'bg-primary'"
      class="rounded-md py-2 px-3 text-lg disabled:opacity-40 w-full h-full hover:opacity-80"
      [disabled]="isDisabled"
    >
      {{ text }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() isDisabled: boolean = false;
  @Input() warn: boolean = false;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter();

  onClick() {
    this.clickEvent.emit();
  }
}
