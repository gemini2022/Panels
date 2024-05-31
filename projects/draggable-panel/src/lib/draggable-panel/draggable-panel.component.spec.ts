import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePanelComponent } from './draggable-panel.component';

describe('DraggablePanelComponent', () => {
  let component: DraggablePanelComponent;
  let fixture: ComponentFixture<DraggablePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggablePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraggablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
