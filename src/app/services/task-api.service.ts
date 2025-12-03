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
      { id: 1, title: 'Fix login Bug', description: 'Update login with single sign on mode', status: 'pending' as 'pending', createdAt: new Date('2025-01-01 13:00') },
      { id: 2, title: 'Implement search feature', description: 'update server side searching with API', status: 'in-progress' as 'in-progress', createdAt: new Date('2025-01-07 11:50') },
      { id: 3, title: 'Update Documentation', description: 'Update gitbook documentation for newly releasing feature', status: 'done' as 'done', createdAt: new Date('2025-01-03 10:20') },
      { id: 4, title: 'Design new UI mockups', description: 'Using Figma create new ui designs for mobile app', status: 'pending' as 'pending', createdAt: new Date('2025-01-05 09:15') },
      { id: 5, title: 'Optimize database queries', description: 'Update Database Indexing mechanism', status: 'in-progress' as 'in-progress', createdAt: new Date('2025-01-02 14:30') },
      { id: 6, title: 'Set up CI/CD pipeline', description: 'Create new staging environment for QA testing', status: 'done' as 'done', createdAt: new Date('2025-01-06 16:45') },
    ]).pipe(
      delay(1000)
    );
  }
}
