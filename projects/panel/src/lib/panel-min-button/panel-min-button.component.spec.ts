import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMinButtonComponent } from './panel-min-button.component';

describe('PanelMinButtonComponent', () => {
  let component: PanelMinButtonComponent;
  let fixture: ComponentFixture<PanelMinButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelMinButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelMinButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
