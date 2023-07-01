import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockVentasComponent } from './stock-ventas.component';

describe('StockVentasComponent', () => {
  let component: StockVentasComponent;
  let fixture: ComponentFixture<StockVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
