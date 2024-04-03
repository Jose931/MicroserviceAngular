import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CommonService<Course>{

  protected override baseEndpoint = 'http://localhost:8090/api/course';
}
