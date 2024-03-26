import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAvatarButtonComponent } from './user-avatar-button.component';

describe('UserAvatarButtonComponent', () => {
  let component: UserAvatarButtonComponent;
  let fixture: ComponentFixture<UserAvatarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAvatarButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAvatarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
