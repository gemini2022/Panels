import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePanelBarComponent } from './collapsible-panel-bar.component';

describe('CollapsiblePanelBarComponent', () => {
  let component: CollapsiblePanelBarComponent;
  let fixture: ComponentFixture<CollapsiblePanelBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsiblePanelBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollapsiblePanelBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
