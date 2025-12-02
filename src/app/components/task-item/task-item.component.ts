import { Component, inject, input } from '@angular/core';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {

  router = inject(Router);
  taskItem = input.required<Task>();

  openTask() {
    this.router.navigate(['/tasks', this.taskItem().id]);
  }
}
