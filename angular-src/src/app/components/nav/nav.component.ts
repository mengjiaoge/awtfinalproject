import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  currentUser = JSON.parse(localStorage.getItem('user'));

  ngOnInit() {
    this.loggedIn();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  isLecturer() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    return this.currentUser.lecturer;
  }
}
