import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamsComponent } from './components/exams/exams.component';
import { UsersFormComponent } from './components/users/users-form.component';
import { CourseFormComponent } from './components/courses/course-form.component';
import { ExamFormComponent } from './components/exams/exam-form.component';
import { AddStudentsComponent } from './components/courses/add-students.component';
import { AssingExamsComponent } from './components/courses/assing-exams.component';

export const routes: Routes = [
    {path: 'students', component:UsersComponent},
    {path: 'students/form', component:UsersFormComponent},
    {path: 'students/form/:id', component:UsersFormComponent},
    {path: 'courses', component:CoursesComponent},
    {path: 'courses/form', component:CourseFormComponent},
    {path: 'courses/form/:id', component:CourseFormComponent},
    {path: 'exams', component:ExamsComponent},
    {path: 'exam/form', component:ExamFormComponent},
    {path: 'exam/form/:id', component:ExamFormComponent},
    {path: 'courses/assign-students/:id', component:AddStudentsComponent},
    {path: 'courses/assign-exam/:id', component:AssingExamsComponent},
    {path: '**', redirectTo: 'students', pathMatch: 'full'}
];
