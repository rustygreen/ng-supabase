import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveUserAvatarButtonComponent } from './active-user-avatar-button.component';

describe('ActiveUserAvatarButtonComponent', () => {
  let component: ActiveUserAvatarButtonComponent;
  let fixture: ComponentFixture<ActiveUserAvatarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveUserAvatarButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveUserAvatarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
