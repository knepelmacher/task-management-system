import {statuasEnum} from "./statuasEnum"

export interface itask{
    taskId: any
    id:string
    name:string
    price:string
    scheduling:Date
    discription:string
    status:statuasEnum
}