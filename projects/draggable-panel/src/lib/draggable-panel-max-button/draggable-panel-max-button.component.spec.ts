import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePanelMaxButtonComponent } from './draggable-panel-max-button.component';

describe('DraggablePanelMaxButtonComponent', () => {
  let component: DraggablePanelMaxButtonComponent;
  let fixture: ComponentFixture<DraggablePanelMaxButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggablePanelMaxButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraggablePanelMaxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
