import { TestBed } from '@angular/core/testing';

import { RecruitementService } from './recruitement.service';

describe('RecruitementService', () => {
  let service: RecruitementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruitementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
