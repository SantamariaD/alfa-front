import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDocumentosComponent } from './card-documentos.component';

describe('CardDocumentosComponent', () => {
  let component: CardDocumentosComponent;
  let fixture: ComponentFixture<CardDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
