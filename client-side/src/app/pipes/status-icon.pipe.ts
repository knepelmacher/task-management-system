import { Pipe, PipeTransform } from '@angular/core';
import {statuasEnum} from '../Model/statuasEnum'

@Pipe({
  standalone: true,
  name: 'statusIcon'
})
export class statusIconPipe implements PipeTransform {

  transform(value: statuasEnum): string {
    switch (value)
    {
      case statuasEnum.pending:
        return 'chair';
      case statuasEnum.cancel:
        return 'clear';
      case statuasEnum.completed:
        return 'camera';
      case statuasEnum.process:
        return 'computer';
     }return ''
}
}