import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePanelArrowComponent } from './collapsible-panel-arrow.component';

describe('CollapsiblePanelArrowComponent', () => {
  let component: CollapsiblePanelArrowComponent;
  let fixture: ComponentFixture<CollapsiblePanelArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsiblePanelArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollapsiblePanelArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
