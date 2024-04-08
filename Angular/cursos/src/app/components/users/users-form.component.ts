import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet, 
    CommonModule, 
    FormsModule
  ],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent implements OnInit{
  
  titulo = "Inserta un alumnno";
  student: Student = new Student();
  error: any;
  private photoSelected: File;

  constructor(private service: StudentService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if(id){
        this.service.show(id).subscribe( student => {
          this.student = student;
          this.titulo = `Actualizando ${student.name}`;
        });
      }
    })
  }

  public create(): void{

    if(this.photoSelected == null){
      this.service.create(this.student).subscribe({
        next: (student) => {
          console.log(student);
          Swal.fire('Nuevo:', `Alumno creado con exito ${student.name}`, 'success');
          this.router.navigate(['/students']);
        },
        error: err => {
          if(err.status === 400){
            this.error = err.error;
            console.log(this.error);
          }
      }});
    }else {
      this.service.createWithPhoto(this.student, this.photoSelected).subscribe({
        next: (student) => {
          console.log(student);
          Swal.fire('Nuevo:', `Alumno creado con exito ${student.name}`, 'success');
          this.router.navigate(['/students']);
        },
        error: err => {
          if(err.status === 400){
            this.error = err.error;
            console.log(this.error);
          }
      }});
    }
  }

  public edit(): void{

    if(this.photoSelected == null){
      this.service.edit(this.student).subscribe({
        next: (student) => {
          console.log(student);
          Swal.fire('Modificado:', `Alumno modificado con exito ${student.name}`, 'success');
          this.router.navigate(['/students']);
        },
        error: err => {
          if(err.status === 400){
            this.error = err.error;
            console.log(this.error);
          }
      }});
    }else{
      this.service.editWithPhoto(this.student, this.photoSelected).subscribe({
        next: (student) => {
          console.log(student);
          Swal.fire('Modificado:', `Alumno modificado con exito ${student.name}`, 'success');
          this.router.navigate(['/students']);
        },
        error: err => {
          if(err.status === 400){
            this.error = err.error;
            console.log(this.error);
          }
      }});
    }

    
  }

  public selectPhoto(event): void{
    this.photoSelected = event.target.files[0];
    console.info(this.photoSelected);

    if(this.photoSelected.type.indexOf('image') < 0){
      this.photoSelected == null;
      Swal.fire('Error al seleccionar la foto:',
       'El archivo debe ser del tipo imagen',
       'error');
    }
  }
}
