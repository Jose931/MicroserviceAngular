import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    this.service.create(this.student).subscribe({
      next: (student) => {
        console.log(student);
        alert(`Alumno creado con exito ${student.name}`);
        this.router.navigate(['/students']);
      },
      error: err => {
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
    }});
  }

  public edit(): void{
    this.service.edit(this.student).subscribe({
      next: (student) => {
        console.log(student);
        alert(`Alumno ${student.name} actualizado con exito`);
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
