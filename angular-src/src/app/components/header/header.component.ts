import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  currentUser = JSON.parse(localStorage.getItem('user'));

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
  }

}
