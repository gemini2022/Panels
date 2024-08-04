import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonGroupComponent } from 'button-group';
// import { CollapsiblePanelArrowComponent, CollapsiblePanelBarComponent, CollapsiblePanelBodyComponent, CollapsiblePanelComponent, CollapsiblePanelTitleComponent } from 'collapsible-panel';
// import { DraggablePanelBarComponent, DraggablePanelBodyComponent, DraggablePanelComponent, DraggablePanelMaxButtonComponent, DraggablePanelMinButtonComponent, DraggablePanelTitleComponent, DraggablePanelXButtonComponent } from 'draggable-panel';
import { PanelComponent } from '../../projects/panel/src/lib/panel/panel.component';
import { PanelBarComponent } from '../../projects/panel/src/lib/panel-bar/panel-bar.component';
import { PanelBodyComponent } from '../../projects/panel/src/lib/panel-body/panel-body.component';
import { PanelTitleComponent } from '../../projects/panel/src/lib/panel-title/panel-title.component';
import { CollapsiblePanelComponent } from '../../projects/collapsible-panel/src/lib/collapsible-panel/collapsible-panel.component';
import { CollapsiblePanelBarComponent } from '../../projects/collapsible-panel/src/lib/collapsible-panel-bar/collapsible-panel-bar.component';
import { CollapsiblePanelBodyComponent } from '../../projects/collapsible-panel/src/lib/collapsible-panel-body/collapsible-panel-body.component';
import { CollapsiblePanelTitleComponent } from '../../projects/collapsible-panel/src/lib/collapsible-panel-title/collapsible-panel-title.component';
import { CollapsiblePanelArrowComponent } from '../../projects/collapsible-panel/src/lib/collapsible-panel-arrow/collapsible-panel-arrow.component';
import { DraggablePanelComponent } from '../../projects/draggable-panel/src/lib/draggable-panel/draggable-panel.component';
import { DraggablePanelBarComponent } from '../../projects/draggable-panel/src/lib/draggable-panel-bar/draggable-panel-bar.component';
import { DraggablePanelBodyComponent } from '../../projects/draggable-panel/src/lib/draggable-panel-body/draggable-panel-body.component';
import { DraggablePanelTitleComponent } from '../../projects/draggable-panel/src/lib/draggable-panel-title/draggable-panel-title.component';
import { DraggablePanelXButtonComponent } from '../../projects/draggable-panel/src/lib/draggable-panel-x-button/draggable-panel-x-button.component';
import { DraggablePanelMaxButtonComponent } from '../../projects/draggable-panel/src/lib/draggable-panel-max-button/draggable-panel-max-button.component';
import { DraggablePanelMinButtonComponent } from '../../projects/draggable-panel/src/lib/draggable-panel-min-button/draggable-panel-min-button.component';
// import { PanelBarComponent, PanelBodyComponent, PanelComponent, PanelTitleComponent } from 'panel';

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
  // private maxButton = viewChild(DraggablePanelMaxButtonComponent);
  

  // private ngOnInit(): void {
  //   this.maxButton()?.clickedEvent.subscribe(() => {
  //     this.maxButtonIcon = this.maxButtonIcon === 'stack' ? 'check_box_outline_blank' : 'stack';
  //     this.maxButtonTooltip = this.maxButtonTooltip === 'Restore Down' ? 'Maximize' : 'Restore Down';
  //   })
  // }



  onClick() {
    this.moreContent = !this.moreContent;
  }
}