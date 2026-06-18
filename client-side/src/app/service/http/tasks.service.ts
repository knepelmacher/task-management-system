import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestModel } from '../../Model/http-request.model';
import { HttpServiceBase } from './http-service.base';
import { itask } from '../../Model/itask';

@Injectable({  providedIn: 'root'})
export class TasksService extends HttpServiceBase {

   private get _serverUrl(): string {
      return `${this.config.ips.servicePath}tasks/`;
   }

   getTasks$(): Observable<itask[]> {
       return this.get$<itask[]>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'getTasks',
      }));
    }

    addTask$(task: itask): Observable<Boolean>{
      return this.post$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'addtask',
        body:task
      }));
    }

    updateTask$(task: itask): Observable<Boolean>{
      return this.put$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'updatetask',
        body:task
      }));
    }

     deleteTask$(taskId: number): Observable<Boolean>{
      return this.delete$<Boolean>(new HttpRequestModel({
        url: this._serverUrl,
        action: 'deleteTask',
        params:{taskId}
      }));
    }
}
