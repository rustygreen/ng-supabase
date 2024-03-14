import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialsGridComponent } from './socials-grid.component';

describe('SocialsGridComponent', () => {
  let component: SocialsGridComponent;
  let fixture: ComponentFixture<SocialsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
