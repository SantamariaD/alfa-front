import { TestBed } from '@angular/core/testing';

import { DocumentosBackService } from './documentos-back.service';

describe('DocumentosBackService', () => {
  let service: DocumentosBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentosBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
