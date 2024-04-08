import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet, 
    CommonModule, 
    FormsModule
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent implements OnInit {
  titulo = 'Inserta un curso';
  course: Course = new Course();
  error: any;

  constructor(
    private service: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      if (id) {
        this.service.show(id).subscribe((course) => {
          this.course = course;
          this.titulo = `Actualizando ${course.name}`;
        });
      }
    });
  }

  public create(): void {
    this.service.create(this.course).subscribe({
      next: (course) => {
        console.log(course);
        Swal.fire(
          'Nuevo:',
          `Alumno creado con exito ${course.name}`,
          'success'
        );
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        if (err.status === 400) {
          this.error = err.error;
          console.log(this.error);
        }
      }
    });
  }

  public edit(): void{
    this.service.edit(this.course).subscribe({
      next: (course) => {
        console.log(course);
        Swal.fire('Modificado:', `Curso modificado con exito ${course.name}`, 'success');
        this.router.navigate(['/courses']);
      },
      error: err => {
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
    }});
  }
}
