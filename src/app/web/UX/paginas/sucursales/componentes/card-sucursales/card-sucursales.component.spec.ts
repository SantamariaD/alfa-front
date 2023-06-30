import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSucursalesComponent } from './card-sucursales.component';

describe('CardSucursalesComponent', () => {
  let component: CardSucursalesComponent;
  let fixture: ComponentFixture<CardSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSucursalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
