import { Component, OnInit, ViewChild, } from '@angular/core';
import { AppComponent } from '../../app.component';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';
import { UsersFormComponent } from './users-form.component';
import { RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AppComponent, 
    CommonModule, 
    RouterLink, 
    UsersFormComponent,
    MatPaginatorModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  
  titulo = 'Listado de Alumnos';
  students: Student[];
  totalRecords = 0;
  actualPage = 0;
  totalPerPage = 3;
  pageSizeOptions= [3, 6, 9, 12];

  constructor(private service: StudentService){}
  
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
      this.students = p.content as Student[];
      this.totalRecords = p.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    });
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
          this.calculateRange();
          Swal.fire('Eliminado', `Alumno ${student.name} eliminado con exito`, 'success');
        });
      }
    }); 
  }
}
