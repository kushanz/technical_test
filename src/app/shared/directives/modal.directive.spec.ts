import { TestBed } from '@angular/core/testing';
import { ModalService } from '../shared_services/modal.service';
import { ModalDirective } from './modal.directive';

describe('ModalDirective', () => {

  let modalService: ModalService;
  let directive: ModalDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ModalService]
    }).compileComponents();
    
    modalService = TestBed.inject(ModalService);
    directive = TestBed.runInInjectionContext(() => new ModalDirective());
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
