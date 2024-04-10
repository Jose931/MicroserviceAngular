import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../app';
import { Student } from '../models/student';
import { Exam } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private head: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  private baseEndpoint = BASE_ENDPOINT + '/answer';

  constructor(private http: HttpClient) { }

  public create(answers: Answer[]): Observable<Answer[]>{
    return this.http.post<Answer[]>(
      this.baseEndpoint, 
      answers, 
      {headers: this.head}
    );
  }

  public getAnswerByStudentByExam(student: Student, exam: Exam): Observable<Answer[]>{
    return this.http.get<Answer[]>(`${this.baseEndpoint}/student/${student.id}/exam/${exam.id}`);
  }
}
