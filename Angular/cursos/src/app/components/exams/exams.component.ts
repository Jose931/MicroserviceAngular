import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { Exam } from '../../models/exam';
import { BASE_ENDPOINT } from '../../app';
import { ExamService } from '../../services/exam.service';
import { ExamFormComponent } from './exam-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    AppComponent, 
    CommonModule, 
    RouterLink, 
    ExamFormComponent,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css'
})
export class ExamsComponent implements OnInit {

  titulo = 'Listado de Examenes';
  exams: Exam[];
  totalRecords = 0;
  actualPage = 0;
  totalPerPage = 6;
  pageSizeOptions= [6, 12, 15, 20];
  baseEndpoint = BASE_ENDPOINT + "/exams";

  constructor(private service: ExamService){}
  
  ngOnInit(): void {
    this.calculateRange();
  }

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public paginate(event: PageEvent): void{
    this.actualPage = event.pageIndex;
    this.totalPerPage = event.pageSize;
    this.paginator._intl.itemsPerPageLabel = '';
    this.calculateRange();
    
  }


  private calculateRange(){

    this.service.listPage(this.actualPage.toString(), this.totalPerPage.toString())
    .subscribe(p => {
      this.exams = p.content as Exam[];
      this.totalRecords = p.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    });
  }

  public delete(exam: Exam): void{

    Swal.fire({
      title: "Cuidado!",
      text: `¿Seguro que desas eliminar a ${exam.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if(result.value){
        this.service.delete(exam.id).subscribe(() => {
          this.calculateRange();
          Swal.fire('Eliminado', `Alumno ${exam.name} eliminado con exito`, 'success');
        });
      }
    }); 
  }

}
