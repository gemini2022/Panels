import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePanelXButtonComponent } from './draggable-panel-x-button.component';

describe('DraggablePanelXButtonComponent', () => {
  let component: DraggablePanelXButtonComponent;
  let fixture: ComponentFixture<DraggablePanelXButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggablePanelXButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraggablePanelXButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
