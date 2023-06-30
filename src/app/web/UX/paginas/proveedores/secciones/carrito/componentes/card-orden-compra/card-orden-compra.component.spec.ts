import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrdenCompraComponent } from './card-orden-compra.component';

describe('CardOrdenCompraComponent', () => {
  let component: CardOrdenCompraComponent;
  let fixture: ComponentFixture<CardOrdenCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOrdenCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
