import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamsComponent } from './components/exams/exams.component';
import { UsersFormComponent } from './components/users/users-form.component';
import { CourseFormComponent } from './components/courses/course-form.component';

export const routes: Routes = [
    {path: 'students', component:UsersComponent},
    {path: 'students/form', component:UsersFormComponent},
    {path: 'students/form/:id', component:UsersFormComponent},
    {path: 'courses', component:CoursesComponent},
    {path: 'courses/form', component:CourseFormComponent},
    {path: 'courses/form/:id', component:CourseFormComponent},
    {path: 'exams', component:ExamsComponent},
    {path: '**', redirectTo: 'students', pathMatch: 'full'}
];
