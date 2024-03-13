import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterOrSignInComponent } from './register-or-sign-in.component';

describe('RegisterOrSignInComponent', () => {
  let component: RegisterOrSignInComponent;
  let fixture: ComponentFixture<RegisterOrSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOrSignInComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterOrSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
