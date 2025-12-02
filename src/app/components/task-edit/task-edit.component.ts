import { Component, inject, input } from '@angular/core';
import { Task } from '../../models/task.model';
import { ModalService } from '../../shared/shared_services/modal.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskListStore } from '../../signal-store/tasklist.store';

@Component({
  selector: 'task-edit',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {

  modalService = inject(ModalService);

  taskStore = inject(TaskListStore);

  task = input.required<Task>();

  private fb = inject(FormBuilder);
  editForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    status: ['pending', Validators.required]
  });

  ngOnInit() {
    this.editForm.setValue({
      title: this.task()?.title || '',
      description: this.task()?.description || '',
      status: this.task()?.status || ''
    })
  }
  

  saveTask() {
    // console.log(this.editForm.value);
    if (this.task() && this.editForm.valid) {
      const updatedTask: Task = {
        id: this.task().id,
        title: this.editForm.value.title || '',
        description: this.editForm.value.description || '',
        status:  this.editForm.value.status as 'pending' | 'done' | 'in-progress',
      };

      this.taskStore.editTask(updatedTask);
    }

    this.modalService.close();
  }

  cancel() {
    this.modalService.close();
  }
}
