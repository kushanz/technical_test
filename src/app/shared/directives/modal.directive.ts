import { Component, Directive, inject } from '@angular/core';
import { ModalService } from '../shared_services/modal.service';

@Component({
  selector: '[Modal]',
  template: `
    <style>
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
      }
      .modal-box {
        background: white;
        padding: 20px;
        border-radius: 8px;
        min-width: 300px;
        max-width: 500px;
        min-height: 400px;
        margin: 100px auto;
        position: relative;
      }
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        background-image: url('/assets/icons/close-icon.svg');
        width: 20px;
        height: 20px;
        background-size: cover;
      }
    </style>
    <div class="modal-backdrop">
      <div class="modal-box">
        <span class="close" (click)="close()"></span>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ModalDirective {
  modalService = inject(ModalService);

  constructor() { }

  close() {
    this.modalService.close();
  }
}
