import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalPopup = new Subject<boolean>();
  public modalPopup$ = this.modalPopup.asObservable();
   
  constructor() { }

  open() {
    this.modalPopup.next(true);
  }

  close() {
    this.modalPopup.next(false);
  }
}
