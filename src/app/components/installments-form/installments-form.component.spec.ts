import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentsFormComponent } from './installments-form.component';
import { months } from '../../helpers/month.array';
import { KEYBOARD_KEYS } from '../../helpers/keycodes.enum';


export const arrowClickEvent = (fixture, arrowId) => {
  fixture.nativeElement.querySelector(arrowId).click();
  fixture.detectChanges();
};

export const keyboardPressEvent = (fixture, eventKey) => {
  const keyEvent = new KeyboardEvent('keyup', { key: eventKey });
  document.dispatchEvent(keyEvent);
  fixture.detectChanges();
};

export const setMockDate = (monthId) => {
  const currentYear = new Date().getFullYear();
  jasmine.clock().mockDate(new Date(currentYear, monthId, 0o1));
  jasmine.clock().install();
};


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

  it('should display monthly deposit bigger than 0 when there is a total amount', () => {
    component.totalNumber = 12000;
    component.totalOfMonths = 12;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#form-footer-monthly-installment').textContent).toBe('$1,000.00');
    expect(fixture.nativeElement.querySelector('#form-footer-monthly-installment').textContent).not.toBe('$');
  });

  describe('when current date is last month', () => {
    beforeEach(() => {
      setMockDate(11);
      fixture = TestBed.createComponent(InstallmentsFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('#input-date #month should start at first month', () => {
      expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[0]);
    });

    it('#input-date #year should start at current year + 1', () => {
      const nextYear = new Date().getFullYear() + 1;

      expect(fixture.nativeElement.querySelector('#year').textContent).toBe(nextYear.toString());
    });
  });

  describe('when current date is not last month', () => {
    beforeEach(() => {
      setMockDate(10);
      fixture = TestBed.createComponent(InstallmentsFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('#input-date #month should start at current month + 1;', () => {
      const month = new Date().getMonth();

      expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[month + 1]);
    });

    it('#input-date #year should start at current year', () => {
      const year = new Date().getFullYear().toString();

      expect(fixture.nativeElement.querySelector('#year').textContent).toBe(year);
    });
  });

  describe('when input-date value is in the last month at any current date', () => {
    beforeEach(() => {
      setMockDate(9);
      fixture = TestBed.createComponent(InstallmentsFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      arrowClickEvent(fixture, '#input-increase-btn');
    });

    describe('and #input-increase-btn is clicked', () => {
      it('should navigate to first month', () => {
        arrowClickEvent(fixture, '#input-increase-btn');

        expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[0]);
      });

      it('should navigate to year + 1', () => {
        const nextYear = new Date().getFullYear() + 1;

        arrowClickEvent(fixture, '#input-increase-btn');

        expect(fixture.nativeElement.querySelector('#year').textContent).toBe(nextYear.toString());
      });
    });

    describe('and right arrow is pressed on the keyboard', () => {
      it('should navigate to first month', () => {
        keyboardPressEvent(fixture, KEYBOARD_KEYS.RIGHT_ARROW);

        expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[0]);
      });

      it('should navigate to year + 1', () => {
        const nextYear = new Date().getFullYear() + 1;

        keyboardPressEvent(fixture, KEYBOARD_KEYS.RIGHT_ARROW);

        expect(fixture.nativeElement.querySelector('#year').textContent).toBe(nextYear.toString());
      });
    });
  });

  describe('when input-date value is not in the last month at any current date', () => {
    beforeEach(() => {
      setMockDate(5);
      fixture = TestBed.createComponent(InstallmentsFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('and #input-increase-btn is clicked', () => {
      it('should navigate to month + 1', () => {
        const month = component.monthIndex;

        arrowClickEvent(fixture, '#input-increase-btn');

        expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[month + 1]);
      });

      it('should navigate to year + 1', () => {
        const year = new Date().getFullYear();

        arrowClickEvent(fixture, '#input-increase-btn');

        expect(fixture.nativeElement.querySelector('#year').textContent).toBe(year.toString());
      });
    });

    describe('and right arrow is pressed on the keyboard', () => {
      it('should navigate to month + 1', () => {
        const month = component.monthIndex;

        keyboardPressEvent(fixture, KEYBOARD_KEYS.RIGHT_ARROW);

        expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[month + 1]);
      });

      it('should navigate to year + 1', () => {
        const year = new Date().getFullYear();

        keyboardPressEvent(fixture, KEYBOARD_KEYS.RIGHT_ARROW);

        expect(fixture.nativeElement.querySelector('#year').textContent).toBe(year.toString());
      });
    });
  });

  describe('when input-date value is at start date', () => {
    describe('and #input-decrease-btn is clicked', () => {
      it('should not navigate', () => {
        const month = component.monthIndex;
        const year = component.year.toString();

        arrowClickEvent(fixture, '#input-decrease-btn');

        expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[month]);
        expect(fixture.nativeElement.querySelector('#year').textContent).toBe(year);
      });
    });

    describe('and left arrow is pressed on the keyboard', () => {
      it('should not navigate', () => {
        const month = component.monthIndex;
        const year = component.year.toString();

        keyboardPressEvent(fixture, KEYBOARD_KEYS.LEFT_ARROW);

        expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[month]);
        expect(fixture.nativeElement.querySelector('#year').textContent).toBe(year);
      });
    });
  });

  describe('when input-date value is at start month + n', () => {
    describe('and date is not first month', () => {
      beforeEach(() => {
        setMockDate(1);
        fixture = TestBed.createComponent(InstallmentsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        keyboardPressEvent(fixture, KEYBOARD_KEYS.RIGHT_ARROW);
      });

      describe('and #input-decrease-btn is clicked', () => {
        it('should navigate to month - 1', () => {
          const month = component.monthIndex;

          arrowClickEvent(fixture, '#input-decrease-btn');

          expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[month - 1]);
        });

        it('should stay at same year', () => {
          const year = component.year.toString();

          arrowClickEvent(fixture, '#input-decrease-btn');

          expect(fixture.nativeElement.querySelector('#year').textContent).toBe(year);
        });
      });

      describe('and left arrow is pressed on the keyboard ', () => {
        it('should navigate to month - 1', () => {
          const month = component.monthIndex;

          keyboardPressEvent(fixture, KEYBOARD_KEYS.LEFT_ARROW);

          expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[month - 1]);
        });

        it('should stay at same year', () => {
          const year = component.year.toString();

          keyboardPressEvent(fixture, KEYBOARD_KEYS.LEFT_ARROW);

          expect(fixture.nativeElement.querySelector('#year').textContent).toBe(year);
        });
      });
    });

    describe('and date is first month', () => {
      beforeEach(() => {
        setMockDate(10);
        fixture = TestBed.createComponent(InstallmentsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        keyboardPressEvent(fixture, KEYBOARD_KEYS.RIGHT_ARROW);
      });

      describe('and #input-decrease-btn is clicked', () => {
        it('should navigate to last month', () => {
          arrowClickEvent(fixture, '#input-decrease-btn');
          expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[months.length - 1]);
        });

        it('should navigate to year - 1', () => {
          const lastYear = component.year - 1;

          arrowClickEvent(fixture, '#input-decrease-btn');

          expect(fixture.nativeElement.querySelector('#year').textContent).toBe(lastYear.toString());
        });
      });

      describe('and left arrow is pressed on the keyboard', () => {
        it('should navigate to last month', () => {
          keyboardPressEvent(fixture, KEYBOARD_KEYS.LEFT_ARROW);

          expect(fixture.nativeElement.querySelector('#month').textContent).toBe(months[months.length - 1]);
        });

        it('should snavigate to year - 1', () => {
          const lastYear = component.year - 1;

          keyboardPressEvent(fixture, KEYBOARD_KEYS.LEFT_ARROW);

          expect(fixture.nativeElement.querySelector('#year').textContent).toBe(lastYear.toString());
        });
      });
    });
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
