import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsFormComponent } from './installments-form.component';
import { months } from '../../helpers/month.array';


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

  it('should set start date field with next month and current year', () => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear().toString();

    const inputMonth = fixture.nativeElement.querySelector('#month').textContent;
    const inputYear = fixture.nativeElement.querySelector('#year').textContent;

    expect(inputMonth).toBe(months[currentMonthIndex + 1]);
    expect(inputYear).toBe(currentYear);
  });

  it('should go to next month when right arrow is clicked', () => {
    const rightArrow = fixture.nativeElement.querySelector('#input-increase-btn');
    const index = component.monthIndex;

    rightArrow.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[index + 1]);
  });

  it('should not navigate to past dates when left arrow is clicked', () => {
    const leftArrow = fixture.nativeElement.querySelector('#input-decrease-btn');
    const index = component.monthIndex;

    leftArrow.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[index]);
  });

  it('should navigate to previous month when left arrow is clicked', () => {
    const leftArrow = fixture.nativeElement.querySelector('#input-decrease-btn');
    const rightArrow = fixture.nativeElement.querySelector('#input-increase-btn');
    const index = component.monthIndex;

    // navigate to next month
    rightArrow.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[index + 1]);

    // navigate to previous month
    leftArrow.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[index]);
  });

  describe('when in december', () => {
    beforeEach(() => {
      jasmine.clock().mockDate(new Date(2020, 11, 0o1));
      jasmine.clock().install();
      fixture = TestBed.createComponent(InstallmentsFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('input should start in january of the next year', () => {
      console.log(component.month);

      expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[0]);
      expect(fixture.nativeElement.querySelector('#year').textContent).toBe('2021');
    });
  });


  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
