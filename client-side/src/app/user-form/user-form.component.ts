import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../service/http/users.service';
import { SnackService } from '../service/snack.service';
import { FormBuilder, FormControl, FormGroup ,ReactiveFormsModule, Validators} from '@angular/forms';
import { RoleEnum } from '../Model/role';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  private fd = inject(FormBuilder);
  private userService = inject(UsersService);
  private snack = inject(SnackService);
  userForm: FormGroup = {} as FormGroup;;

  theRoleEnum = RoleEnum;

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
  ){}
  ngOnInit(): void {
    this.userForm = this.fd.group({
    name: ['', [Validators.required, Validators.min(8)]],
    phone: ['', [Validators.required,Validators.pattern(/^[0-9-]+$/)  ]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.max(10)]],
    roleId: new FormControl(RoleEnum.standard)
  });
}
  save(){
    const user = this.userForm.value;
    this.userService.addUser$(user).pipe(
      tap((result) => this.dialogRef.close({success: true})),
    ).subscribe(
      (_=> this.snack.openSnackBar('עבר בהצלחה', 'משתמש חדש התווסף')),
      (err) => this.snack.openSnackBar('שגיאה בהוספת משתמש', err)
   );
  }

  cancel(){
  this.dialogRef.close({success: true});
  }
}