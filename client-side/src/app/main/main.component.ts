import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { RouterModule , RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, tap } from 'rxjs';
import { CheckHttpService } from '../service/http/check-http.service';
import { TasksComponent } from '../tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { NavbarService } from '../service/navbar.service';
@Component({
  standalone: true,
  selector: 'app-main',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    RouterLink,
    TasksComponent,
    FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  connection = inject(CheckHttpService);
  isServerAlive: boolean | null = null;
  router = inject(Router);
  navbarService = inject(NavbarService);
  buttons : any;
  dataSubscription: Subscription | undefined;
  @ViewChild('about') targetElement!: ElementRef;


  ngOnInit(): void {
    this.dataSubscription = this.navbarService.nav$.subscribe(data => {
      this.buttons = data.buttons;
    });

    this.checkServer();
    setInterval(() => {
      this.checkServer();
    }, 2000);
    this.goToComponent('tasks');
  }

  private checkServer(): void {
    this.connection.check$().subscribe(
      (result) => {
        this.isServerAlive = !!result;
      },
      (err) => {
        console.error('checkConnection failed:', err);
        this.isServerAlive = false;
      }
    );
  }
  goToComponent(child: string) {
    if(child==='home'){
      this.router.navigate(['/']);
      return
    }
    const path = this.navbarService.getCurrentNavbar('main', child);
    this.router.navigate([path]);
  }
  navigate(child: string): void {
    this.goToComponent(child);
  }
  scrollToElement() {
    console.log(this.targetElement);

    const element = this.targetElement.nativeElement;
    if (element) {

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  changeUser(){
    localStorage.setItem('user','');
    this.router.navigate(['/login']);
  }
  }

