import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent implements OnInit{
  
  titulo = "Inserta un alumnno";
  student: Student = new Student();

  constructor(private service: StudentService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void{
    this.service.create(this.student).subscribe(student => {
      console.log(student);
      alert(`Alumno creado con exito ${student.name}`);
      this.router.navigate(['/students']);
    });
  }
}
