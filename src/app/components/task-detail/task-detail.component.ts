import { Component, computed, inject } from '@angular/core';
import { TaskListStore } from '../../signal-store/tasklist.store';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ModalDirective } from '../../shared/directives/modal.directive';
import { ModalService } from '../../shared/shared_services/modal.service';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { DialogService } from '../../shared/shared_services/dialog.service';

@Component({
  selector: 'app-task-detail',
  imports: [SpinnerComponent,ErrorComponent, DatePipe, ModalDirective, AsyncPipe, TaskEditComponent,DialogComponent],
  providers: [ModalDirective],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  taskStore = inject(TaskListStore);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  modalService = inject(ModalService);
  dialogService = inject(DialogService);

  // Convert the route param observable to a signal
  taskId = toSignal(
    this.activatedRoute.paramMap.pipe(map(params => Number(params.get('id')))),
    { initialValue: -1 }
  );

  // Compute the selected task from the store using the id param
  selectedTask = computed<Task | undefined>(() =>
    this.taskStore.tasks().find(t => t.id === this.taskId())
  );

  ngOnInit() {
    // console.log('Task Detail Component initialized with ID:', this.taskId());
    // console.log('Selected Task:', this.selectedTask());
  }
  loadModal() {
    this.modalService.open();
  }

  deleteTask() {
    this.dialogService.dialog('Confirm Deletion', 'Are you sure you want to delete this task?','YES','NO', 
      () => { // if yes
        if (this.selectedTask()) {
          this.taskStore.deleteTask(this.selectedTask()!.id);
          this.router.navigate(['/tasks']);
        }
      }, 
      () => { // if no
        this.dialogService.subject.next(null);
      }
    );
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
