import { Component, inject } from '@angular/core';
import { DialogService } from '../../shared_services/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dialog-popup',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  dialogSubscription!: Subscription

  private dialogService = inject(DialogService);

  dialog: any

  ngOnInit() {
    this.dialogSubscription = this.dialogService.getMessage().subscribe({
      next: (dialog) => {
        this.dialog = dialog;
      }
    })
  }

  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }

}
