import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { ExamService } from '../../services/exam.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { Exam } from '../../models/exam';
import { map, mergeMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assing-exams',
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
    MatTabsModule
  ],
  templateUrl: './assing-exams.component.html',
  styleUrl: './assing-exams.component.css',
})
export class AssingExamsComponent implements OnInit {
  course: Course;
  examsFilters: Exam[] = [];
  examsSelected: Exam[] = [];
  exams: Exam[] = [];

  dataSource: MatTableDataSource<Exam>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  autocompleteControl = new FormControl();

  showColumns = ['name', 'specificSubject', 'delete'];
  showColumnsExams = ['id', 'name', 'specificSubject', 'delete'];
  tabIndex = 0;

  pageSizeOptions = [3, 6, 9];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.courseService.show(id).subscribe((c) => {
        this.course = c;
        this.exams = this.course.exams;
        this.initPaginator();
      });
    });

    this.autocompleteControl.valueChanges
      .pipe(
        map((value) => (typeof value === 'string' ? value : value.name)),
        mergeMap((value) => (value ? this.examService.nameFilter(value) : []))
      )
      .subscribe((exams) => (this.examsFilters = exams));
  }

  private initPaginator() {
    this.dataSource = new MatTableDataSource<Exam>(this.exams);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
  }

  public showName(exam?: Exam): string {
    return exam ? exam.name : '';
  }

  public selectExam(event: MatAutocompleteSelectedEvent): void {
    const exam = event.option.value as Exam;
    if (!this.exist(exam.id)) {
      this.examsSelected = this.examsSelected.concat(exam);
    } else {
      Swal.fire(
        'Error:',
        `El examen ${exam.name} ya esta asignado al curso`,
        'error'
      );
    }
    this.autocompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
  }

  private exist(id: number): boolean {
    let exist = false;
    this.examsSelected.concat(this.exams).forEach((e) => {
      if (id === e.id) {
        exist = true;
      }
    });
    return exist;
  }

  public deleteSelected(exam: Exam): void {
    this.examsSelected = this.examsSelected.filter((e) => exam.id != e.id);
  }

  public assign(): void {
    this.courseService
      .assignExams(this.course, this.examsSelected)
      .subscribe((course) => {
        this.exams = this.exams.concat(this.examsSelected);
        this.initPaginator();
        this.examsSelected = [];
        Swal.fire(
          'Asignados:',
          `Examenes asignados al curso ${course.name}`,
          'success'
        );
        this.tabIndex = 2;
      });
  }

  public deleteExamCourse(exam: Exam): void {
    Swal.fire({
      title: 'Cuidado!',
      text: `¿Seguro que desas eliminar el examen de ${exam.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.value) {
        this.courseService.deleteExam(this.course, exam).subscribe((course) => {
          this.exams = this.exams.filter((e) => e.id != exam.id);
          this.initPaginator();
          Swal.fire(
            'Eliminado:',
            `Exame ${exam.name} eliminado con exito del curso ${course.name}.`,
            'success'
          );
        });
      }
    });
  }
}
