import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMetodoPagoComponent } from './card-metodo-pago.component';

describe('CardMetodoPagoComponent', () => {
  let component: CardMetodoPagoComponent;
  let fixture: ComponentFixture<CardMetodoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMetodoPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMetodoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
