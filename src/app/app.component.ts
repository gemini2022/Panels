import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonGroupComponent } from 'button-group';
import { CollapsiblePanelArrowComponent, CollapsiblePanelBarComponent, CollapsiblePanelBodyComponent, CollapsiblePanelComponent, CollapsiblePanelTitleComponent } from 'collapsible-panel';
import { DraggablePanelBarComponent, DraggablePanelBodyComponent, DraggablePanelComponent, DraggablePanelMaxButtonComponent, DraggablePanelMinButtonComponent, DraggablePanelTitleComponent, DraggablePanelXButtonComponent } from 'draggable-panel';
import { PanelBarComponent, PanelBodyComponent, PanelComponent, PanelTitleComponent } from 'panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PanelComponent,
    PanelBarComponent,
    PanelBodyComponent,
    PanelTitleComponent,
    ButtonGroupComponent,
    

    CollapsiblePanelComponent,
    CollapsiblePanelBarComponent,
    CollapsiblePanelBodyComponent,
    CollapsiblePanelTitleComponent,
    CollapsiblePanelArrowComponent,

    DraggablePanelComponent,
    DraggablePanelBarComponent,
    DraggablePanelBodyComponent,
    DraggablePanelTitleComponent,
    DraggablePanelXButtonComponent,
    DraggablePanelMaxButtonComponent,
    DraggablePanelMinButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected moreContent!: boolean;
  protected maxButtonIcon: string = 'stack';
  protected maxButtonTooltip: string = 'Restore Down'
  private maxButton = viewChild(DraggablePanelMaxButtonComponent);
  

  private ngOnInit(): void {
    this.maxButton()?.clickedEvent.subscribe(() => {
      this.maxButtonIcon = this.maxButtonIcon === 'stack' ? 'check_box_outline_blank' : 'stack';
      this.maxButtonTooltip = this.maxButtonTooltip === 'Restore Down' ? 'Maximize' : 'Restore Down';
    })
  }



  onClick() {
    this.moreContent = !this.moreContent;
  }
}