import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetPasswordComponent } from './set-password.component';
import { SupabaseConfig } from '../supabase-config';
import { RouterTestingModule } from '@angular/router/testing';

describe('SetPasswordComponent', () => {
  let component: SetPasswordComponent;
  let fixture: ComponentFixture<SetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetPasswordComponent, RouterTestingModule],
      providers: [
        {
          provide: SupabaseConfig,
          useValue: new SupabaseConfig({
            apiKey: 'some-key',
            apiUrl: 'mock://localhost/supabase',
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
