import { TestBed } from '@angular/core/testing';

import { ProductoOrdenCompraService } from './producto-orden-compra.service';

describe('ProductoOrdenCompraService', () => {
  let service: ProductoOrdenCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoOrdenCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
