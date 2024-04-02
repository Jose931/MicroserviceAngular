import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamsComponent } from './components/exams/exams.component';

export const routes: Routes = [
    {path: 'students', component:UsersComponent},
    {path: 'courses', component:CoursesComponent},
    {path: 'exams', component:ExamsComponent},
    {path: '**', redirectTo: 'students', pathMatch: 'full'}
];
