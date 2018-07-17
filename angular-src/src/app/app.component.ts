import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  enabledRoutes = ['login', 'register', ''];

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
  }

  permission() {
    const currentRoute = this.router.url.split('/')[1];
    if (this.loggedIn()) {
      if (this.enabledRoutes.includes(currentRoute)) {
        return false;
      }
      return true;
    } else {
      if (this.enabledRoutes.includes(currentRoute)) {
        return true;
      }
    }
    return false;
  }


}
