import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent implements OnInit {

    constructor(
        public http: HttpClient,
        private route: ActivatedRoute
    ) {
    }
    session;
    courses;
    showSessions = false;
    activeCourseId;
    passKey: string;
    errorMessage: string;
  ngOnInit() {
      this.activeCourseId = this.route.snapshot.paramMap.get('id');
      if (!this.activeCourseId) {
          this.getCourses();
      }
  }

    getCourses() {
        const url = '/api/courses/getall';
        this.http.get(url).subscribe(result => {
            this.courses = result;
        });
    }

  onAddSession(submittedData){
    submittedData={
        "id":this.activeCourseId,
        "sessions":submittedData
    };
    console.log(submittedData);
    console.log(localStorage.getItem('user'));
      let url = '/api/courses/sessions/save';
      this.http.post(url, submittedData, {headers: {'Content-Type': 'application/json'}}).subscribe(result => {
          console.log(result)
      });


};
addSessions(submittedData) {
      let url = '/api/courses/sessions/save';
      //let param= JSON.stringify({id: submittedData});
      this.http.post(url, submittedData, {headers: {'Content-Type': 'application/json'}}).subscribe(result => {
          console.log(result)
      });
  }

get currentSession() { return JSON.stringify(this.session); };
}
