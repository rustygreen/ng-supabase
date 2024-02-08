// Angular.
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

// ng-supabase.
import { SupabaseConfig, SupabaseService } from '@ng-supabase/core';

// Local.
import { WaitMessageComponent } from './wait-message.component';

describe('WaitMessageComponent', () => {
  let component: WaitMessageComponent;
  let fixture: ComponentFixture<WaitMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitMessageComponent, RouterTestingModule],
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

    fixture = TestBed.createComponent(WaitMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
