import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import { Router } from '@angular/router';
import { Task } from '../../models/task.model';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mockTask: Task = { id: 42, title: 'Test Task', description: 'This is a test task.',status:'pending' };
    fixture.componentRef.setInput('taskItem', mockTask);
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
    expect(component.taskItem()).toEqual(mockTask);
    expect(component.taskItem().id).toBe(42);
    expect(component.taskItem().title).toBe('Test Task');
  });

  it('should navigate with task id', () => {
    const mockTask: Task = { id: 5, title: 'Test Task', description: 'Test description', status: 'pending' };
    fixture.componentRef.setInput('taskItem', mockTask);
    fixture.detectChanges();
    
    component.openTask();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tasks', 5]);
  });
});
