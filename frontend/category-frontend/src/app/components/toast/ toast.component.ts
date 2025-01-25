import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="fixed top-16 right-4 space-y-2">
      <div
        *ngFor="let toast of toastService.getToasts()"
        [ngClass]="{
          'bg-green-500': toast.type === 'success',
          'bg-red-500': toast.type === 'error'
        }"
        class="text-white px-4 py-2 rounded-lg shadow-lg"
      >
        {{ toast.message }}
      </div>
    </div>
  `,
  styles: [],
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
