import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePanelBodyComponent } from './draggable-panel-body.component';

describe('DraggablePanelBodyComponent', () => {
  let component: DraggablePanelBodyComponent;
  let fixture: ComponentFixture<DraggablePanelBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggablePanelBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraggablePanelBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
