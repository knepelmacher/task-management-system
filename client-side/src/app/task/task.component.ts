import { CommonModule } from '@angular/common';
import { Component ,Input} from '@angular/core';
import { itask } from '../Model/itask';
import { hebrewPipe } from '../pipes/hebrew.pipe';
import { TaskViewMode } from '../Model/taskviewmode';
import { AppoverhilighDirective } from '../directive/appoverhiligh.directive';
import {statusIconPipe} from '../pipes/status-icon.pipe'
import {MatIconModule} from '@angular/material/icon'

@Component({
  standalone: true,
  selector: 'app-task',
  imports: [CommonModule,hebrewPipe,AppoverhilighDirective,statusIconPipe,MatIconModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

 @Input() task: itask = {} as itask;
  
}
