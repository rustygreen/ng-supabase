// Angular.
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Local.
import { SupabaseConfig } from '../supabase-config';
import { SupabaseService } from '../supabase.service';
import { ActiveUserAvatarButtonComponent } from './active-user-avatar-button.component';

describe('ActiveUserAvatarButtonComponent', () => {
  let component: ActiveUserAvatarButtonComponent;
  let fixture: ComponentFixture<ActiveUserAvatarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ActiveUserAvatarButtonComponent],
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

    fixture = TestBed.createComponent(ActiveUserAvatarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
