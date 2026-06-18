import { Component ,inject,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common'
import {FormBuilder, FormGroup, FormsModule ,ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../service/http/auth.service';
import { tap } from 'rxjs/operators';
import {SnackService} from '../service/snack.service'
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ FormsModule ,ReactiveFormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  snack = inject(SnackService);
  auth = inject(AuthService);
  router = inject(Router);
  mouseoverLogin:boolean=false
  formGroup:FormGroup={} as FormGroup

constructor(private formBuilder:FormBuilder ){}

ngOnInit(){
  this.formGroup=this.formBuilder.group({
    username: this.formBuilder.control(''),
    password: this.formBuilder.control('')
  });
}
logIn(){
   const { username, password } = this.formGroup.value;
   const userName = username?.trim();
   if (!userName || !password) {
     this.snack.openSnackBar('לוגין נכשל', 'אנא הזן שם משתמש וסיסמה');
     return;
   }

   this.auth.login$({ userName, password }).pipe(
      tap((user) =>{
        if(user){
          const  { password, ...rest} = user;
          localStorage.setItem('user', JSON.stringify(rest));
          this.router.navigate(['/main']);
        } else{
           this.snack.openSnackBar('לוגין נכשל', 'בדוק תקינות שלשם משתמש או סיסמא')
        }
      })).subscribe();
}
}
