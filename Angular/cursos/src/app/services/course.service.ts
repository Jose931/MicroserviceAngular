import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../app';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam';

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

   public deleteStudent(course: Course, student: Student): Observable<Course>{

    return this.http.put<Course>(`${this.baseEndpoint}/${course.id}/delte-student`,
      student, {headers: this.head});

   }

   public assignExams(course: Course, exams: Exam[]): Observable<Course>{
    return this.http.put<Course>(`${this.baseEndpoint}/${course.id}/assign-exam`,
      exams,
      {headers: this.head}
    );
   }

   public deleteExam(course: Course, exam: Exam): Observable<Course>{
    return this.http.put<Course>(`${this.baseEndpoint}/${course.id}/delete-exam`,
      exam,
      {headers: this.head}
    );
   }

   public getCourseByStudentId(student: Student): Observable<Course>{
    return this.http.get<Course>(`${this.baseEndpoint}/student/${student.id}`);
   }
}
