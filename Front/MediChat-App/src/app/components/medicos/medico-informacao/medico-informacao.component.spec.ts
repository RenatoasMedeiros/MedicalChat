/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MedicoInformacaoComponent } from './medico-informacao.component';

describe('MedicoInformacaoComponent', () => {
  let component: MedicoInformacaoComponent;
  let fixture: ComponentFixture<MedicoInformacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoInformacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
