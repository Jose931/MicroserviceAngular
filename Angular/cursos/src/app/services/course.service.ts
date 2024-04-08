import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../app';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CommonService<Course>{

  protected override baseEndpoint = BASE_ENDPOINT + '/course';

  constructor(http: HttpClient) {
    super(http);
   }
}
