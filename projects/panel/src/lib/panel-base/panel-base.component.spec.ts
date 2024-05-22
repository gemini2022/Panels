import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBaseComponent } from './panel-base.component';

describe('PanelBaseComponent', () => {
  let component: PanelBaseComponent;
  let fixture: ComponentFixture<PanelBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
