// Angular.
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// ng-supabase.
import { SupabaseConfig, SupabaseService } from '@ng-supabase/core';

// Local.
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent, RouterTestingModule],
      providers: [
        {
          provide: SupabaseConfig,
          useValue: new SupabaseConfig({
            apiKey: 'some-key',
            apiUrl: 'mock://localhost/supabase',
          }),
        },
        {
          provide: SupabaseService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
