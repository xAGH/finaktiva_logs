import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    @if (isLoading()) {
    <div
      class="absolute inset-0 flex items-center justify-center bg-background opacity-70"
    >
      <div
        class="flex items-center justify-center animate-spin rounded-full h-24 w-24 bg-gradient-to-r from-purple-300 to-purple-700"
      >
        <div class="h-20 w-20 bg-background rounded-full"></div>
      </div>
    </div>
    }
  `,
})
export class SpinnerComponent {
  private readonly spinnerSrv = inject(SpinnerService);
  isLoading = this.spinnerSrv.isLoading;
}
