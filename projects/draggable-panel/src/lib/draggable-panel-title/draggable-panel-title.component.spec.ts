import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePanelTitleComponent } from './draggable-panel-title.component';

describe('DraggablePanelTitleComponent', () => {
  let component: DraggablePanelTitleComponent;
  let fixture: ComponentFixture<DraggablePanelTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggablePanelTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraggablePanelTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
