import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseEndpoint = 'http://localhost:8090/api/students';

  constructor(private http: HttpClient) { }
}
