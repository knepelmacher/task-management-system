import { Injectable } from '@angular/core';
import { HttpServiceBase } from './http-service.base';
import { HttpRequestModel } from '../../Model/http-request.model';
import { iuser } from '../../Model/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends HttpServiceBase {
  private get _serverUrl():string{ 
    return `${this.config.ips.servicePath}users/`;
  }

  getUsers$(): Observable<iuser[]> {
    return this.get$<iuser[]>(new HttpRequestModel({
      url: this._serverUrl,
      action: 'getusers',
    }));
  }

   addUser$(user: iuser): Observable<Boolean>{
      return this.post$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'adduser',
        body:user
      }));
    }

   deleteUser$(userId: number): Observable<Boolean>{
      return this.delete$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'deleteuser',
        params:{userId}
      }));
    }
}
