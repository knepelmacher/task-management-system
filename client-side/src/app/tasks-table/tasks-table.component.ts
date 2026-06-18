import { Component , Input ,OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {itask} from'../Model/itask'
import { hebrewPipe } from '../pipes/hebrew.pipe';
import {AppoverhilighDirective} from '../directive/appoverhiligh.directive'
import {MatTableModule} from '@angular/material/table'
import {statusIconPipe} from '../pipes/status-icon.pipe'
import {TaskFormComponent} from '../task-form/task-form.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon'
import { TasksService } from '../service/http/tasks.service';
import { SnackService } from '../service/snack.service';
import { tap } from 'rxjs';
@Component({
  standalone: true,
  selector: 'app-tasks-table',
  imports: [
    CommonModule,
    hebrewPipe,
    FormsModule,
    MatTableModule,
    AppoverhilighDirective,
    TaskFormComponent,
    statusIconPipe,
    MatIconModule
],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit{
 private dialog = inject(MatDialog)
 private snack = inject(SnackService);
 private taskService = inject(TasksService)
 private dialogRef:MatDialogRef<TaskFormComponent>|null = null;
 columns:string[]=[];
 @Input()tasklist:itask[]=[];
 notDisplayColumns = ['id']
 iconColumns = ['delete', 'status', 'update']

 ngOnInit():void{
  if(this.tasklist.length){
 this.columns = [...Object.keys(this.tasklist[0])
 .filter(key=> !this.notDisplayColumns.includes(key))
 ,'update', 'delete']
  }
}
updateTask(task:itask){
  this.dialogRef = this.dialog.open(TaskFormComponent, {
    width: '50vw',
    disableClose: false,
    data: { task }
  })

  this.dialogRef.afterClosed().subscribe(result =>{
    console.log('dialog closed', result)
    this.dialogRef = null
  })

}
deleteTask(task:itask){
  this.taskService.deleteTask$(task.taskId).pipe(
     
            ).subscribe(
              (_=>{}),
              (err => this.snack.openSnackBar('שגיאה בעדכון משימה',err))
            );  
    


}}
