import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  //https://ng-bootstrap.github.io/#/getting-started
  public isCollapsed!: boolean;

  constructor() {
    this.isCollapsed = true;

  }
}
