import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonGroupComponent } from 'button-group';
import { PanelBarComponent, PanelMaxButtonComponent, PanelMinButtonComponent, PanelXButtonComponent, PanelBaseComponent, PanelComponent, PanelTitleComponent } from 'panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PanelComponent,
    PanelBarComponent,
    PanelBaseComponent,
    PanelTitleComponent,
    ButtonGroupComponent,
    PanelXButtonComponent,
    PanelMaxButtonComponent,
    PanelMinButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'panels';
  private panel = viewChild(PanelComponent);
  protected maxButtonIcon: string = 'stack';

  private ngOnInit(): void {
    this.panel()?.maxButtonClickedEvent.subscribe(()=> {
      this.maxButtonIcon = this.maxButtonIcon === 'stack' ? 'check_box_outline_blank' : 'stack';
    })
  }
}