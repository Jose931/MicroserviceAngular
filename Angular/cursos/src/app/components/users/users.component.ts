import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';
import { UsersFormComponent } from './users-form.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AppComponent, CommonModule, RouterLink, UsersFormComponent],
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

  public delete(student: Student): void{

    Swal.fire({
      title: "Cuidado!",
      text: `¿Seguro que desas eliminar a ${student.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if(result.value){
        this.service.delete(student.id).subscribe(() => {
          this.service.list().subscribe(students => this.students = students);
          Swal.fire('Eliminado', `Alumno ${student.name} eliminado con exito`, 'success');
        });
      }
    }); 
  }
}
