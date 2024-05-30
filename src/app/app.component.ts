import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonGroupComponent } from 'button-group';
import { CollapsiblePanelArrowComponent, CollapsiblePanelBarComponent, CollapsiblePanelBodyComponent, CollapsiblePanelComponent, CollapsiblePanelTitleComponent } from 'collapsible-panel';
import { PanelBarComponent, PanelMaxButtonComponent, PanelMinButtonComponent, PanelXButtonComponent, PanelBodyComponent, PanelComponent, PanelTitleComponent } from 'panel';

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
    PanelXButtonComponent,
    PanelMaxButtonComponent,
    PanelMinButtonComponent,

    CollapsiblePanelComponent,
    CollapsiblePanelBarComponent,
    CollapsiblePanelBodyComponent,
    CollapsiblePanelTitleComponent,
    CollapsiblePanelArrowComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'panels';
  private panel = viewChild(PanelComponent);
  protected maxButtonIcon: string = 'stack';
  protected maxButtonTooltip: string = 'Restore Down'

  trumpy!: boolean;

  private ngOnInit(): void {
    this.panel()?.maxButtonClickedEvent.subscribe(() => {
      this.maxButtonIcon = this.maxButtonIcon === 'stack' ? 'check_box_outline_blank' : 'stack';
      this.maxButtonTooltip = this.maxButtonTooltip === 'Restore Down' ? 'Maximize' : 'Restore Down';
    })
  }



  onClick() {
    this.trumpy = !this.trumpy;
  }
}