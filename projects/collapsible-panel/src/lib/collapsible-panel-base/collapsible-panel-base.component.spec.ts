import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePanelBaseComponent } from './collapsible-panel-base.component';

describe('CollapsiblePanelBaseComponent', () => {
  let component: CollapsiblePanelBaseComponent;
  let fixture: ComponentFixture<CollapsiblePanelBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsiblePanelBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollapsiblePanelBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
