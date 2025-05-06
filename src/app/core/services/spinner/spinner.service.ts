import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerSubject = new BehaviorSubject<boolean>(false);
  public spinner$ = this.spinnerSubject;

  public show(){
      this.spinnerSubject.next(true);
  }

  public hide(){
      this.spinnerSubject.next(false);
  }
}
