import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-about',
  imports: [ MatCardModule,
    MatDividerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit , OnDestroy{
developerName = 'מלכי לב';
technologies = ['Angular Material', 'Design Patterns', 'RxJS', 'NGRX'];

currentTime = '';
private timeSub?: Subscription;

  ngOnInit(): void {
    const clock$ = interval(1000).pipe(
      map(() => new Date().toLocaleTimeString('he-IL', { hour12: false }))
    );

    this.timeSub = clock$.subscribe(time => {
      this.currentTime = time
  });
}

ngOnDestroy(): void {
  this.timeSub?.unsubscribe();
}
}


