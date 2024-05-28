import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePanelTitleComponent } from './collapsible-panel-title.component';

describe('CollapsiblePanelTitleComponent', () => {
  let component: CollapsiblePanelTitleComponent;
  let fixture: ComponentFixture<CollapsiblePanelTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsiblePanelTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollapsiblePanelTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
