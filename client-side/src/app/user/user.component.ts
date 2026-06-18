import { Component, Input, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common'
import {iuser} from '../Model/iuser'

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
user:iuser={} as iuser

ngOnInit():void{
  const details = localStorage.getItem('user');

  if(details){
    this.user = JSON.parse(details) as iuser;
  }
}
}
