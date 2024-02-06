import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitMessageComponent } from './wait-message.component';

describe('WaitMessageComponent', () => {
  let component: WaitMessageComponent;
  let fixture: ComponentFixture<WaitMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaitMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
