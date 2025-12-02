import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor() { }

  // mock api for tasks
  getTasks():Observable<Task[]> {
    return of([
      { id: 1, title: 'Fix login Bug', description: 'Description for Task 1', status: 'pending' as 'pending', createdAt: new Date('2025-01-01 13:00') },
      { id: 2, title: 'Implement search feature', description: 'Description for Task 2', status: 'in-progress' as 'in-progress', createdAt: new Date('2025-01-07 11:50') },
      { id: 3, title: 'Update Documentation', description: 'Description for Task 3', status: 'done' as 'done', createdAt: new Date('2025-01-03 10:20') },
    ]).pipe(
      delay(1000)
    );
  }
}
