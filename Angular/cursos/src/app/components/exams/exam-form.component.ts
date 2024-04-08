import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Exam } from '../../models/exam';
import { ExamService } from '../../services/exam.service';
import Swal from 'sweetalert2';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet, 
    CommonModule,
    FormsModule
  ],
  templateUrl: './exam-form.component.html',
  styleUrl: './exam-form.component.css'
})
export class ExamFormComponent implements OnInit {
  titulo = 'Inserta un examen';
  exam: Exam = new Exam();
  generalSubjects: Subject[] = [];
  specificSubjects: Subject[] = [];
  error: any;

  constructor(
    private service: ExamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      if (id) {
        this.service.show(id).subscribe((course) => {
          this.exam = course;
          this.titulo = `Actualizando ${course.name}`;
        });
      }
    });

    this.service.findAllSubjects().subscribe(subject => {
      this.generalSubjects = subject.filter(a => !a.generalSubject);
    });
  }

  public takeSpecificSubjects(): void{
    this.specificSubjects = this.exam.generalSubject? 
    this.exam.generalSubject.specificSubject: 
    [];
  }

  public create(): void {
    this.service.create(this.exam).subscribe({
      next: (exam) => {
        console.log(exam);
        Swal.fire(
          'Nuevo:',
          `Examen creado con exito ${exam.name}`,
          'success'
        );
        this.router.navigate(['/exams']);
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
    this.service.edit(this.exam).subscribe({
      next: (exam) => {
        console.log(exam);
        Swal.fire('Modificado:', `Examen modificado con exito ${exam.name}`, 'success');
        this.router.navigate(['/exams']);
      },
      error: err => {
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
    }});
  }
}
