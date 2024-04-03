import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends CommonService<Student>{

  protected override baseEndpoint = 'http://localhost:8090/api/students';

  constructor(http: HttpClient){
    super(http);
  }

  public createWithPhoto(student: Student, file: File): Observable<Student>{
    
    const formData = new FormData();
    formData.append('archive', file);
    formData.append('name', student.name);
    formData.append('secondName', student.secondName);
    formData.append('email', student.email);

    return this.http.post<Student>(this.baseEndpoint + '/create-with-photo', formData);
  }

  public editWithPhoto(student: Student, file: File): Observable<Student>{
    
    const formData = new FormData();
    formData.append('archive', file);
    formData.append('name', student.name);
    formData.append('secondName', student.secondName);
    formData.append('email', student.email);
    
    return this.http.put<Student>(`${this.baseEndpoint}/edit-with-photo/${student.id}`, formData);
  }
  
}
