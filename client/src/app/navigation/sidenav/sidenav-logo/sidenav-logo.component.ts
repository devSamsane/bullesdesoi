import { Component } from '@angular/core';

@Component({
  selector: 'bds-sidenav-logo',
  templateUrl: './sidenav-logo.component.html',
  styleUrls: ['./sidenav-logo.component.scss']
})
export class SidenavLogoComponent {
  logo = '../../../../assets/logos/bullesdesoi-logo-500.png';
  title = 'Bulles de soi';
}
