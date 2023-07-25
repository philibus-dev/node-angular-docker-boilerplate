import { TestBed } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppHeaderComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppHeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
