import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  
  titulo = 'Listado de Alumnos';
  
  ngOnInit(): void {
  }



}
