import { Component, inject } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskListStore } from '../../signal-store/tasklist.store';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'task-list',
  imports: [TaskItemComponent,SpinnerComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  taskStore = inject(TaskListStore);

  setQuery(val: string) {
    this.taskStore.updateSearchTerm(val)
  }
  sort(by:string) {
    this.taskStore.updateSortTerm(by)
  }

  clearSearch(input: HTMLInputElement) {
    this.taskStore.updateSearchTerm('')
    input.value = ''
  }
}
