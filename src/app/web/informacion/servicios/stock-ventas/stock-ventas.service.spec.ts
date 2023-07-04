import { TestBed } from '@angular/core/testing';

import { StockVentasService } from './stock-ventas.service';

describe('StockVentasService', () => {
  let service: StockVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
