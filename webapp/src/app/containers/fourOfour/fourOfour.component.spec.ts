import { TestBed } from '@angular/core/testing';
import { FourOfourComponent } from './fourOfour.component';

describe('FourOfourComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FourOfourComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FourOfourComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
