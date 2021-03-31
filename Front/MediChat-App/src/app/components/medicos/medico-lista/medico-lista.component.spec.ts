/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MedicoListaComponent } from './medico-lista.component';

describe('MedicoListaComponent', () => {
  let component: MedicoListaComponent;
  let fixture: ComponentFixture<MedicoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
