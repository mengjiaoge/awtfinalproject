import { Component, OnInit } from '@angular/core';
import { COURSES } from '../../mock-courses';
import { Course } from '../../course';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(
    public http: HttpClient,
  ) { }

  courses;
  currentUser;

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    const url = '/api/courses/getall';
    this.http.get(url).subscribe(result => {
      this.courses = result;
    });
  }

  isLecturer() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    return this.currentUser.lecturer;
  }

}
