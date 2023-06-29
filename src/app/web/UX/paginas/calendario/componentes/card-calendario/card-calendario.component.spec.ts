import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCalendarioComponent } from './card-calendario.component';

describe('CardCalendarioComponent', () => {
  let component: CardCalendarioComponent;
  let fixture: ComponentFixture<CardCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCalendarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
