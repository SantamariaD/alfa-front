import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSucursalesComponent } from './agregar-sucursales.component';

describe('AgregarSucursalesComponent', () => {
  let component: AgregarSucursalesComponent;
  let fixture: ComponentFixture<AgregarSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSucursalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
