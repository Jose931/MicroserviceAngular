import { Injectable } from '@angular/core';
import { Exam } from '../models/exam';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends CommonService<Exam>{

  protected override baseEndpoint = 'http://localhost:8090/api/exams';
}
