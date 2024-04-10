import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Course } from '../../models/course';
import { Answer } from '../../models/answer';
import { Exam } from '../../models/exam';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-show-exam-modal',
  standalone: true,
  imports: [
    AppComponent,
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule
  ],
  templateUrl: './show-exam-modal.component.html',
  styleUrl: './show-exam-modal.component.css'
})
export class ShowExamModalComponent implements OnInit{

  course: Course;
  exam: Exam;
  answers: Answer[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<ShowExamModalComponent>
  ) { }
  
  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.exam = this.data.exam as Exam;
    this.answers = this.data.answers as Answer[];
  }

  public close(): void{
    this.modalRef.close();
  }
}
