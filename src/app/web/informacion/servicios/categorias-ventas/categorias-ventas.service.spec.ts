import { TestBed } from '@angular/core/testing';

import { CategoriasVentasService } from './categorias-ventas.service';

describe('CategoriasVentasService', () => {
  let service: CategoriasVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
