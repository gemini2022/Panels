import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblePanelBodyComponent } from './collapsible-panel-body.component';

describe('CollapsiblePanelBodyComponent', () => {
  let component: CollapsiblePanelBodyComponent;
  let fixture: ComponentFixture<CollapsiblePanelBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsiblePanelBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollapsiblePanelBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
