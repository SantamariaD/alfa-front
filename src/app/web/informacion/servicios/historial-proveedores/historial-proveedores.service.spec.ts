import { TestBed } from '@angular/core/testing';

import { HistorialProveedoresService } from './historial-proveedores.service';

describe('HistorialProveedoresService', () => {
  let service: HistorialProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
