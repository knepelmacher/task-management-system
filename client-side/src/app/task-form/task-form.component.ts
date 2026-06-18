import {statuasEnum} from '../Model/statuasEnum'
import { Component, OnInit, Inject, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common'
import {AbstractControl, FormBuilder, FormControl, FormGroup ,ReactiveFormsModule, Validators, ValidatorFn, ValidationErrors} from '@angular/forms'
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {provideNativeDateAdapter, MatNativeDateModule} from "@angular/material/core"
import {MatDatepickerModule} from "@angular/material/datepicker"
import { itask } from '../Model/itask';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {StatusComponent} from '../status/status.component'
import { TasksService } from '../service/http/tasks.service';
import { tap } from 'rxjs/operators';
import { SnackService } from '../service/snack.service';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StatusComponent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit{
private fd = inject(FormBuilder);
private tasksService = inject(TasksService);
private snack = inject(SnackService);
taskForm: FormGroup = {} as FormGroup;
statusModes = Object.values(statuasEnum)
readonly startDate = new Date();
isNew = true;
@Input() task:itask = {} as itask;
constructor(
  private dialogRef: MatDialogRef<TaskFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
){}

ngOnInit():void{
   this.taskForm = this.fd.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [50, Validators.required],
    scheduling: [null, this.dateFromTodayValidator()],
    status: [statuasEnum.pending],
   });
  this.task = this.data.task;
  if(this.task && Object.keys(this.task).length) {
    const {id, taskId, scheduling, ...taskWithoutId} = this.task as any;
    this.taskForm.patchValue({
      ...taskWithoutId,
      scheduling: scheduling ? new Date(scheduling) : null,
    });
  }
  this.isNew = !this.task || Object.keys(this.task).length ===0;
  }
dateFromTodayValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
      const value = control.value;
      if(!value) return null;

      const inputDate = new Date(value);
      const today = new Date();

      today.setHours(0,0,0);
      inputDate.setHours(0,0,0);

      return inputDate >= today ? null :{ dateFormToday: { minDate :{minDate: today, actual: inputDate}}}
    }
  }
   removeTime(date: Date): Date {
    const theDate  = new Date(date)
    return new Date(Date.UTC(
      theDate.getFullYear(),
      theDate.getMonth(),
      theDate.getDate()
    ));}
    save() {
    if (this.taskForm.valid) { 
      const task: itask = this.taskForm.value;
      task.scheduling = this.removeTime(task.scheduling);
     if(this.isNew){
         this.tasksService.addTask$(task).pipe(
          tap((result) =>  this.dialogRef.close({ success: true })
        )
        ).subscribe(
          (_=>{}),
          (err => this.snack.openSnackBar('שגיאה בהוספת משימה',err))
        );  
     } else{
        task.taskId = this.task.taskId;
        this.tasksService.updateTask$(task).pipe(
          tap((result) =>  this.dialogRef.close({ success: true })
        )
        ).subscribe(
          (_=>{}),
          (err => this.snack.openSnackBar('שגיאה בעדכון משימה',err))
        );  
     }
      
     
    }
  }


  cancel(){
  
        this.dialogRef.close({ success: true });
  
  }
}
  


