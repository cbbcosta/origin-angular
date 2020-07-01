import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should contain logo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const logo = fixture.nativeElement.querySelector('#icon-header').src;

    expect(logo).not.toBeNull();
  });

  it('should contain alternative text for header logo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const altText = fixture.nativeElement.querySelector('#icon-header').alt;

    expect(altText).toBe('Origin Logo');
  });

  it('should contain an h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const h1Title = fixture.nativeElement.querySelector('h1');

    expect(h1Title).not.toBeUndefined();
  });

  it('should contain only one h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const h1Title = fixture.nativeElement.querySelectorAll('h1');

    expect(h1Title.length).toBe(1);
  });
});
