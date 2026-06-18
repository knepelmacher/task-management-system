import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ToColumnNamePipe } from '../pipes/to-column-name.pipe';
import { UsersService } from '../service/http/users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SnackService } from '../service/snack.service';
import { iuser } from '../Model/iuser';
import { map, NEVER, Observable, tap } from 'rxjs';
import { RoleEnum } from '../Model/role';
import { MatButton } from '@angular/material/button';
import { RoleTextPipe } from '../pipes/role-text.pipe';

@Component({
  selector: 'app-users',
   imports:[
     CommonModule,
     MatButton,
    MatIconModule,
    MatTableModule,
    ToColumnNamePipe,
    RoleTextPipe
   ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit  {
   private usersService = inject(UsersService); 
   private dialog = inject(MatDialog);
   private dialogRef: MatDialogRef<UserFormComponent> | null = null;
   private confirmRef: MatDialogRef<ConfirmDialogComponent> | null = null;
   private snack = inject(SnackService);
   usersList :iuser[] | null= [];
   user:iuser = {} as iuser;
   columns: string[] = []; 
   notDisplayColumns: string[] =  [];  
   iconColumns = ['delete']; 
   theRole = RoleEnum
 
   ngOnInit(): void {
     
     const details = localStorage.getItem('user');
   
    if(details){
      this.user = JSON.parse(details);
      if(this.user.roleId !== RoleEnum.manager){
        this.notDisplayColumns = ['password']
      }
      this.loadUsers()
    }
   }   
  
  loadUsers(){
        this.usersService.getUsers$().pipe(
          map(users => users || []),
          tap(users => this.usersList = users),
          tap(users => {
          if(users && users.length){
              this.columns =[... Object.keys(users[0]),'delete']
              .filter(col=> !this.notDisplayColumns.includes(col));
          }
        })).subscribe();
    }

  deleteUser({ userId }: iuser){
    this.confirmRef = this.dialog.open(ConfirmDialogComponent, {
      width: '220px',
      disableClose: false,
        data: { message: 'האם אתה בטוח שאתה רוצה למחוק את המשתמש?'}
    });

    this.confirmRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      if(result){
          this.deleteUserFromList(userId);
      } 
      
    });
  }
  deleteUserFromList(userId: number){
      this.usersService.deleteUser$(userId).pipe(
            tap((result) => this.snack.openSnackBar('מחיקה הסתיימה בהצלחה','')),
            tap(_ => this.loadUsers()),
            tap(_ => this.confirmRef = null )// 
          ).subscribe(
            (_=>{}),
            (err => this.snack.openSnackBar('שגיאה במחיקת משתמש',err))
        );  
  }
  addUser(){
     this.dialogRef = this.dialog.open(UserFormComponent, {
          width: '520px',
          disableClose: false,
            data: { task: null }
        });
    
        this.dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog closed', result);
          this.loadUsers();
          this.dialogRef = null;
        });
  }

 
}
