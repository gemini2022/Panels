import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePanelBarComponent } from './draggable-panel-bar.component';

describe('DraggablePanelBarComponent', () => {
  let component: DraggablePanelBarComponent;
  let fixture: ComponentFixture<DraggablePanelBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggablePanelBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraggablePanelBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
