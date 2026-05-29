import { TestBed } from '@angular/core/testing';

import { Edit } from './edit';

describe('Edit', () => {
  let service: Edit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Edit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
