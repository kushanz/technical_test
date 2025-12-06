import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TaskApiService } from './task-api.service';

describe('TaskApiService', () => {
  let service: TaskApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks', fakeAsync(() => {
    let result: any;
    service.getTasks().subscribe((tasks) => {
      result = tasks;
    });
    tick(1000);
    expect(result).toBeTruthy();
    expect(result.length).toBe(6);
  }));
});
