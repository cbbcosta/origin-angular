import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsFormComponent } from './installments-form.component';

describe('InstallmentsFormComponent', () => {
  let component: InstallmentsFormComponent;
  let fixture: ComponentFixture<InstallmentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallmentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
