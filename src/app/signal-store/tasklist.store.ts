import { signalStore, withState, withComputed, withMethods, patchState, withHooks, getState } from '@ngrx/signals';
import { computed, effect, inject } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskApiService } from '../services/task-api.service';
// import { catchError, of } from 'rxjs';

type TaskState = {
  tasks: Task[];
  searchTerm: string;
  isLoading: boolean;
  sortTerm?: string;
  error: string | null;
}

const initialState:TaskState = {
  tasks: [],
  searchTerm: '',
  isLoading: false,
  sortTerm: 'title',
  error: null
};

export const TaskListStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    // pendingTasks: computed(() => store.tasks().filter(task => task.status === 'pending')),
    // doneTasks: computed(() => store.tasks().filter(task => task.status === 'done')),
    // inProgressTasks: computed(() => store.tasks().filter(task => task.status === 'in-progress')),

    filteredTasks: computed(() => {
      const filter = store.searchTerm().toLowerCase();
      switch((store.sortTerm?.() ?? 'title')) {
        case 'title':
          return store.tasks()
            .filter(task => task.title.toLowerCase().includes(filter) || task.description.toLowerCase().includes(filter))
            .sort((a, b) => a.title.localeCompare(b.title));
        case 'date':
          return store.tasks()
            .filter(task => task.title.toLowerCase().includes(filter) || task.description.toLowerCase().includes(filter))
            .sort((a, b) => (a.createdAt ? a.createdAt.getTime() : 0) - (b.createdAt ? b.createdAt.getTime() : 0));
        case 'status':
          const statusOrder = { 'pending': 3, 'in-progress': 2, 'done': 1 };
          return store.tasks()
            .filter(task => task.title.toLowerCase().includes(filter) || task.description.toLowerCase().includes(filter))
            .sort((a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99));
        default:  
          return store.tasks().filter(task => task.title.toLowerCase().includes(filter) || task.description.toLowerCase().includes(filter));
      }
    })

  })),
  withMethods((store) => ({

    addTask(task: Task) {
      // const currentTasks = store.tasks();
      // store.tasks.set([...currentTasks, task]);
      patchState(store, (state) => ({
        tasks: [...state.tasks, task]
      }))
    },
    editTask(updatedTask: Task) {
      patchState(store, (state) => ({
        tasks: state.tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
      }))
    },
    deleteTask(taskId: number) {
      patchState(store, (state) => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
      }))
    },
    updateSearchTerm(term: string) {
      patchState(store, (state) => ({
        ...state,
        searchTerm: term
      }))
    },
    updateSortTerm(term:string) {
      patchState(store, (state) => ({
        ...state,
        sortTerm: term
      }))
    }
  })
),withHooks({
  onInit: (store, taskService = inject(TaskApiService)) => {

    patchState(store, (state) => ({
      ...state,
      isLoading: true,
      error: null
    }));
    taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        patchState(store, (state) => ({
          ...state,
          tasks: tasks,
          isLoading: false,
          error: null
        }))
      },
      error: (err: any) => {
        patchState(store, (state) => ({
          ...state,
          isLoading: false,
          error: 'Failed to load tasks'
        }))
      }
    })

    effect(() => {
      const state = getState(store);
      // console.log('Current Tasks:', state);
    })
  }
})
);