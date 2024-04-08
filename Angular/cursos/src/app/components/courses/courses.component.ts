import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { BASE_ENDPOINT } from '../../app';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    AppComponent,
    CommonModule,
    RouterLink,
    MatPaginatorModule
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
}
