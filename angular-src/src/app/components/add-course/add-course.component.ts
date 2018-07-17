import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
	course;

  constructor( public http: HttpClient) {}

  ngOnInit() {

  }
  onAddCourse(submittedData){
      this.course=submittedData;
      submittedData.lecturer=JSON.parse(localStorage.getItem('user')).id;
      console.log(submittedData);
  	// this.course=JSON.stringify(submittedData);
      console.log(localStorage.getItem('user'));
        let url = '/api/courses/save';
        this.http.post(url, submittedData, {headers: {'Content-Type': 'application/json'}}).subscribe(result => {
            console.log(result)
        });


  };
    addCourses(submittedData) {
        let url = '/api/courses/add';
        //let param= JSON.stringify({id: submittedData});
        this.http.post(url, submittedData, {headers: {'Content-Type': 'application/json'}}).subscribe(result => {
            console.log(result)
        });
    }

  get currentCourse() { return JSON.stringify(this.course); };



  }