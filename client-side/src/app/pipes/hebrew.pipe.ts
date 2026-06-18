import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'hebrew'
})
export class hebrewPipe implements PipeTransform {

  transform(value: number): string {
    switch (value)
    {
      case -1:
        return 'הושלם'
      case 0:
        return 'ממתין'
      case 1:
        return 'בתהליך' 
      case 2:
        return  'מבוטל' 
      case 3:
        return "הכל"
  }return "all"
}
}
