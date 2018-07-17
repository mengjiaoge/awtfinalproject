import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoursesService {
	private _url: string = "/api/courses";
	course = [];

	constructor(private http: Http) {}


	getCourses(){
  	return this.http.get(this._url)
  		.map((response:Response) => response.json());
  }
}