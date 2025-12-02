import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public subject = new Subject<any>();

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  dialog(title: string, message: string, yesText = 'Yes', noText = 'No', yesFn: () => void, noFn: () => void) {

    const that = this;
    this.subject.next({
      title: title,
      message: message,
      yesText: yesText,
      noText: noText,
      yesFn(): any {
        that.subject.next(null); // close the dialog
        yesFn();
      },
      noFn(): any {
        that.subject.next(null); 
        noFn();
      }
    });
  }

  constructor() { }
}
