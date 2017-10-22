import { TestBed, inject } from '@angular/core/testing';

import { QuizEngineService } from './quiz-engine.service';

describe('QuizEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizEngineService]
    });
  });

  it('should be created', inject([QuizEngineService], (service: QuizEngineService) => {
    expect(service).toBeTruthy();
  }));
});
