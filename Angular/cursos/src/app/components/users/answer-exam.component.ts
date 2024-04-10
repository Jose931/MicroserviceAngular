import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../models/student';
import { Course } from '../../models/course';
import { Exam } from '../../models/exam';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { AnswerExamModalComponent } from './answer-exam-modal.component';
import { AnswerService } from '../../services/answer.service';
import { Answer } from '../../models/answer';
import Swal from 'sweetalert2';
import { ShowExamModalComponent } from './show-exam-modal.component';

@Component({
  selector: 'app-answer-exam',
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
  ],
  templateUrl: './answer-exam.component.html',
  styleUrl: './answer-exam.component.css',
})
export class AnswerExamComponent implements OnInit {
  student: Student;
  course: Course;
  exams: Exam[] = [];

  dataSource: MatTableDataSource<Exam>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 20];

  showColumnsExams = [
    'id',
    'name',
    'specificSubject',
    'questions',
    'answer',
    'show',
  ];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private couerseService: CourseService,
    private answerService: AnswerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.studentService.show(id).subscribe((s) => {
        this.student = s;
        this.couerseService
          .getCourseByStudentId(this.student)
          .subscribe((c) => {
            this.course = c;
            this.exams = c && c.exams ? c.exams : [];
            this.dataSource = new MatTableDataSource<Exam>(this.exams);
            this.dataSource.paginator = this.paginator;
            this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
          });
      });
    });
  }

  public answerExam(exam: Exam): void {
    const modalRef = this.dialog.open(AnswerExamModalComponent, {
      width: '750px',
      data: { course: this.course, student: this.student, exam: exam },
    });

    modalRef.afterClosed().subscribe((answersMap: Map<number, Answer>) => {
      console.log(answersMap);
      if (answersMap) {
        const answers: Answer[] = Array.from(answersMap.values());
        this.answerService.create(answers).subscribe((a) => {
          exam.answered = true;
          Swal.fire('Enviadas:', 'Preguntas enviadas con exito', 'success');
        });
      }
    });
  }

  public showExam(exam: Exam): void {
    this.answerService
      .getAnswerByStudentByExam(this.student, exam)
      .subscribe((answers) => {
        const modalRef = this.dialog.open(ShowExamModalComponent, {
          width: '750px',
          data: {
            course: this.course,
            exam: exam,
            answers: answers,
          },
        });
        modalRef.afterClosed().subscribe(() => {
          console.log('Modal ver examen cerrado');
        });
      });
  }
}
