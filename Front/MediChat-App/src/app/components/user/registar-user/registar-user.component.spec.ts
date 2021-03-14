import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarUserComponent } from './registar-user.component';

describe('RegistarUserComponent', () => {
  let component: RegistarUserComponent;
  let fixture: ComponentFixture<RegistarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistarUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
