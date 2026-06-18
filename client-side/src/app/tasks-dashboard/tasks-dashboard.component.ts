
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { itask } from '../Model/itask';
import { TaskComponent } from '../task/task.component';
@Component({
  standalone: true,
  selector: 'app-tasks-dashboard',
  imports: [CommonModule,FormsModule,TaskComponent],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss'
})
export class TasksDashboardComponent {

@Input()tasklist:itask[]=[]
}
