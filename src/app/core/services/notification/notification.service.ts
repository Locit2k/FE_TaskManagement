import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService){}

  public notify(message:string,type:string = ""){
    if(message)
    {
      let title = "" , severity = "";
      switch(type)
      {
        case "1":
        case "warn":
          title = "Cảnh báo";
          severity = "warn";
          break;
        case "2":
        case "error":
          title = "Lỗi";
          severity = "error";
          break;
        default:
          title = "Thông báo";
          severity = "success";
          break;
      }
      this.messageService.add({ severity: severity, summary: title, detail: message, key: 'notification', life: 3000 });
    }
  }
}
