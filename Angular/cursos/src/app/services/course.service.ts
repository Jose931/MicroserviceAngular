import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../app';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CommonService<Course>{

  protected override baseEndpoint = BASE_ENDPOINT + '/course';

  constructor(http: HttpClient) {
    super(http);
   }

   public assignStudents(course: Course, students: Student[]): Observable<Course> {
    return this.http.put<Course>(`${this.baseEndpoint}/${course.id}/assign-students`, 
    students,
    {headers: this.head});
   }
}
