import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-assing-exams',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    AppComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './assing-exams.component.html',
  styleUrl: './assing-exams.component.css'
})
export class AssingExamsComponent {

}
