import { Pipe, PipeTransform } from '@angular/core';
import { itask } from '../Model/itask';
import { statuasEnum } from '../Model/statuasEnum';

@Pipe({
  standalone: true,
  name: 'select'
})
export class selectPipe implements PipeTransform {

  transform(task:itask[],status:statuasEnum): itask[] {
    if(!task.length||!task||status==statuasEnum.all){
      return task;
    }
    return task.filter(x=>x.status==status);
  }

}
