import { TestBed } from '@angular/core/testing';

import { CatalogoProveedoresService } from './catalogo-proveedores.service';

describe('CatalogoProveedoresService', () => {
  let service: CatalogoProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
