import { Component } from '@angular/core';
import { UsersComponent } from '../users/users.component';
import { CoursesComponent } from '../courses/courses.component';
import { ExamsComponent } from '../exams/exams.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    UsersComponent,
    CoursesComponent,
    ExamsComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
