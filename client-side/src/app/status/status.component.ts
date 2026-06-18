import {Component, Input} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms'
import {MatIconModule} from '@angular/material/icon'
import {statuasEnum} from '../Model/statuasEnum'
import {MatTooltipModule} from '@angular/material/tooltip'
@Component({
  standalone: true,
  selector: 'app-status',
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
   providers: [
    {provide: NG_VALUE_ACCESSOR,
    useExisting:StatusComponent,
    multi:true
   }, ]
})
export class StatusComponent implements ControlValueAccessor{
  private onTouched: () => void = () => {};
  propagateChange = (_: any) => {};

  writeValue(obj: any): void {
    if (obj !== undefined && obj !== null) {
      this._status = obj as statuasEnum;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.canChangeStatus = false;
    }
  }
  theStatusEnum = statuasEnum
  private _status = statuasEnum.pending
  @Input() canChangeStatus:boolean = false
  get status(){
    return this._status
  }
  @Input() set status(val){
    this._status = val
    this.propagateChange(this._status)
  }
  statusToString(status:statuasEnum){
    switch(status){
      case statuasEnum.pending:
        return "ממתין"
      case statuasEnum.process:
        return "בתהליך"
      case statuasEnum.completed:
        return "בוצע"
      case statuasEnum.cancel:
        return "בוטל"
      default:return''
    
    }
  }
  changeStatus(status:statuasEnum){
    if(this.canChangeStatus){
      this._status = status;
      this.propagateChange(this._status);
      this.onTouched();
    }
  }
}