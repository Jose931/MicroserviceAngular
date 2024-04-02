import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseEndpoint = 'http://localhost:8090/api/students';
  private head: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  public list(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseEndpoint);
  }

  public listPage(page: string, size: string): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);

    return this.http.get<any>(`${this.baseEndpoint}/page`, {params: params})
  }

  public show(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseEndpoint}/${id}`);
  }

  public create(student: Student): Observable<Student>{
    return this.http.post<Student>(this.baseEndpoint, student, {headers: this.head})
  }

  public edit(student: Student): Observable<Student>{
    return this.http.put<Student>(
      `${this.baseEndpoint}/${student.id}`, 
      student, 
      {headers: this.head}
      );
  }

  public delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
