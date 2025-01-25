import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'category-frontend';
  notificationMessage: string | null = null;

  onFormSubmitted(): void {
    this.notificationMessage = 'Action completed successfully!';
    setTimeout(() => (this.notificationMessage = null), 3000); // Auto-hide after 3 seconds
  }

  onNotifyUser(message: string): void {
    this.notificationMessage = message;
    setTimeout(() => (this.notificationMessage = null), 3000); // Auto-hide after 3 seconds
  }
}
