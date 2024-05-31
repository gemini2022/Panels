import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePanelMinButtonComponent } from './draggable-panel-min-button.component';

describe('DraggablePanelMinButtonComponent', () => {
  let component: DraggablePanelMinButtonComponent;
  let fixture: ComponentFixture<DraggablePanelMinButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggablePanelMinButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraggablePanelMinButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
