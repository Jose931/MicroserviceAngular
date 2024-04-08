import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './add-students.component.html',
  styleUrl: './add-students.component.css'
})
export class AddStudentsComponent implements OnInit{

  course: Course;
  assingStudents: Student[] = [];
  showColumns: string[] = ['name', 'secondName', 'select'];
  selection: SelectionModel<Student> = new SelectionModel<Student>(true, []);

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.courseService.show(id).subscribe(c => this.course = c);
    });
  }

  public filterName(name: string): void{
    name = name !== undefined? name.trim(): '';
    if(name != ''){
      this.studentService.findByTerm(name).subscribe(students => this.assingStudents = students);
    }
    
  }

  public isAllSelected(): boolean{
    const selected = this.selection.selected.length
    const numStudents = this.assingStudents.length;
    return (selected === numStudents);
  }

  public selecOrDeselecttAll(): void{
    this.isAllSelected() ?
    this.selection.clear() :
    this.assingStudents.forEach(student => this.selection.select(student));
  
  }

  public assing(): void{
    this.courseService.assignStudents(this.course, this.selection.selected)
    .subscribe(c => {
      Swal.fire('Asignados:',
        `Alumnos asignados al curso ${this.course.name}`,
        'success'
      );
      this.assingStudents = [];
      this.selection.clear;
    });
  }
}
