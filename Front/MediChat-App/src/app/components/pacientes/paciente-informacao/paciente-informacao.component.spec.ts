import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteInformacaoComponent } from './paciente-informacao.component';

describe('PacienteInformacaoComponent', () => {
  let component: PacienteInformacaoComponent;
  let fixture: ComponentFixture<PacienteInformacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteInformacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
