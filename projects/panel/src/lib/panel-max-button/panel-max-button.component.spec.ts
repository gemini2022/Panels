import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMaxButtonComponent } from './panel-max-button.component';

describe('PanelMaxButtonComponent', () => {
  let component: PanelMaxButtonComponent;
  let fixture: ComponentFixture<PanelMaxButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelMaxButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelMaxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
