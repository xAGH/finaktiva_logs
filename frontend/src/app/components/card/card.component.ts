import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-surface p-10 rounded-md h-full overflow-y-auto">
      <ng-content />
    </div>
  `,
  styles: ``,
})
export class CardComponent {}
