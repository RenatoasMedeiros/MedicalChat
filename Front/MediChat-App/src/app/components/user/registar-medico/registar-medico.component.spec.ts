import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarMedicoComponent } from './registar-medico.component';

describe('RegistarMedicoComponent', () => {
  let component: RegistarMedicoComponent;
  let fixture: ComponentFixture<RegistarMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistarMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
