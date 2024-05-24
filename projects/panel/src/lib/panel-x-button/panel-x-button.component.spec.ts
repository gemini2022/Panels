import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelXButtonComponent } from './panel-x-button.component';

describe('PanelXButtonComponent', () => {
  let component: PanelXButtonComponent;
  let fixture: ComponentFixture<PanelXButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelXButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelXButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
