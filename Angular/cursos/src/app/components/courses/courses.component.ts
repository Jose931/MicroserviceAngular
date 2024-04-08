import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { BASE_ENDPOINT } from '../../app';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseFormComponent } from './course-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    AppComponent,
    CommonModule,
    RouterLink,
    CourseFormComponent,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{

  titulo = 'Listado Cursos';
  courses: Course[];
  totalRecords = 0;
  actualPage = 0;
  totalPerPage = 6;
  pageSizeOptions= [6, 12, 15, 20];
  baseEndpoint = BASE_ENDPOINT + "/students";

  constructor(private service: CourseService){ }
  
  
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
      this.courses = p.content as Course[];
      this.totalRecords = p.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    });
  }

  public delete(course: Course): void{

    Swal.fire({
      title: "Cuidado!",
      text: `¿Seguro que desas eliminar a ${course.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if(result.value){
        this.service.delete(course.id).subscribe(() => {
          this.calculateRange();
          Swal.fire('Eliminado', `Alumno ${course.name} eliminado con exito`, 'success');
        });
      }
    }); 
  }
}
