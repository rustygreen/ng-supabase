// Angular.
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// ng-supabase.
import { SupabaseConfig, SupabaseService } from '@ng-supabase/core';

// Local.
import { RegisterOrSignInComponent } from './register-or-sign-in.component';

describe('RegisterOrSignInComponent', () => {
  let component: RegisterOrSignInComponent;
  let fixture: ComponentFixture<RegisterOrSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOrSignInComponent, RouterTestingModule],
      providers: [
        {
          provide: SupabaseConfig,
          useValue: new SupabaseConfig({
            apiKey: 'some-key',
            apiUrl: 'mock://localhost/supabase',
            register: {
              metadata: [],
            },
          }),
        },
        {
          provide: SupabaseService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterOrSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
