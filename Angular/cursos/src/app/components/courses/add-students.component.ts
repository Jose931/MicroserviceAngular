import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../models/course';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-add-students',
  standalone: true,
  imports: [
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
  templateUrl: './add-students.component.html',
  styleUrl: './add-students.component.css',
})
export class AddStudentsComponent implements OnInit {
  course: Course;
  assingStudents: Student[] = [];
  students: Student[] = [];

  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 20];

  showColumns: string[] = ['name', 'secondName', 'select'];
  studentColumns: string[] = ['id', 'name', 'secondName', 'email', 'delete'];
  selection: SelectionModel<Student> = new SelectionModel<Student>(true, []);

  tabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      this.courseService.show(id).subscribe((c) => {
        this.course = c;
        this.students = this.course.students;
        this.initPaginator();
      });
    });
  }

  private initPaginator(): void {
    this.dataSource = new MatTableDataSource<Student>(this.students);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
  }

  public filterName(name: string): void {
    name = name !== undefined ? name.trim() : '';
    if (name != '') {
      this.studentService.findByTerm(name).subscribe(
        (students) =>
          (this.assingStudents = students.filter((s) => {
            let filter = true;
            this.students.forEach((cs) => {
              if (s.id === cs.id) {
                filter = false;
              }
            });
            return filter;
          }))
      );
    }
  }

  public isAllSelected(): boolean {
    const selected = this.selection.selected.length;
    const numStudents = this.assingStudents.length;
    return selected === numStudents;
  }

  public selecOrDeselecttAll(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.assingStudents.forEach((student) =>
          this.selection.select(student)
        );
  }

  public assing(): void {
    this.courseService
      .assignStudents(this.course, this.selection.selected)
      .subscribe({
        next: (c) => {
          this.tabIndex = 2;
          Swal.fire(
            'Asignados:',
            `Alumnos asignados al curso ${this.course.name}`,
            'success'
          );
          this.students = this.students.concat(this.selection.selected);
          this.initPaginator();
          this.assingStudents = [];
          this.selection.clear;
        },
        error: (e) => {
          if (e.status === 500) {
            const message = e.error.message as string;
            if (message.indexOf('constraint') > -1) {
              Swal.fire(
                'Cuidado:',
                'No se puede asignar al alumno, ya esta asignado a otro curso',
                'error'
              );
            }
          }
        },
      });
  }

  public deleteStudent(student: Student): void {
    Swal.fire({
      title: 'Cuidado!',
      text: `¿Seguro que desas eliminar a ${student.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.value) {
        this.courseService
          .deleteStudent(this.course, student)
          .subscribe((course) => {
            this.students = this.students.filter((s) => s.id != student.id);
            this.initPaginator();
            Swal.fire(
              'Eliminado:',
              `Alumno ${student.name} eliminado con exito del curso ${course.name}.`,
              'success'
            );
          });
      }
    });
  }
}
