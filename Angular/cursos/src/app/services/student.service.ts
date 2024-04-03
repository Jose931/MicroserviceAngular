import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends CommonService<Student>{

  protected override baseEndpoint = 'http://localhost:8090/api/students';
  
}
