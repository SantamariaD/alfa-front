import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEditarComponent } from './card-editar.component';

describe('CardEditarComponent', () => {
  let component: CardEditarComponent;
  let fixture: ComponentFixture<CardEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
