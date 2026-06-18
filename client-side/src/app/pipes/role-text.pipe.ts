import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnum } from '../Model/role';

@Pipe({
  name: 'roleText'
})
export class RoleTextPipe implements PipeTransform {

  transform(status:RoleEnum): string {
    switch (status) {
      case RoleEnum.manager:
        return 'מנהל';
      case RoleEnum.standard:
        return 'סטנדרט';
      
    }
    return '';
   
  }

}
