import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import {LoginComponent  } from './login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule ,
    MainComponent,
    LoginComponent,
    RouterModule
  ]
})
export class AppComponent {
  title = 'my project';
}
