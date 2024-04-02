import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AppComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  
  titulo = 'Listado de Alumnos';
  students: Student[];

  constructor(private service: StudentService){}
  
  ngOnInit(): void {
    this.service.list().subscribe(students => this.students = students);
  }



}
