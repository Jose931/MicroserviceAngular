import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Course } from '../../models/course';
import { Student } from '../../models/student';
import { Exam } from '../../models/exam';
import {MatExpansionModule} from '@angular/material/expansion';
import { Question } from '../../models/question';
import { Answer } from '../../models/answer';


@Component({
  selector: 'app-answer-exam-modal',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    AppComponent,
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule
  ],
  templateUrl: './answer-exam-modal.component.html',
  styleUrl: './answer-exam-modal.component.css'
})
export class AnswerExamModalComponent implements OnInit{

  course: Course; 
  student: Student; 
  exam: Exam;

  answers: Map<number, Answer> = new Map<number, Answer>();

constructor(
  @Inject( MAT_DIALOG_DATA) public data: any,
  public modalRef: MatDialogRef<AnswerExamModalComponent>
) { }

  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.student = this.data.student as Student;
    this.exam = this.data.exam as Exam;
  }

  public cancel(): void{
    this.modalRef.close();
  }

  public answer(question: Question, event):void{
    const text = event.target.value as string;
    const answer = new Answer();
    answer.student = this.student;
    answer.question = question;
    const exam = new Exam();
    exam.id = this.exam.id;
    exam.name = this.exam.name;
    answer.question.exam = exam;
    answer.text = text;

    this.answers.set(question.id, answer);
    console.log(this.answers);
  }
}
