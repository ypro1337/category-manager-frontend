import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isNavbarVisible = true;

  showNavbar(): void {
    this.isNavbarVisible = true;
  }

  hideNavbar(): void {
    this.isNavbarVisible = false;
  }
}
