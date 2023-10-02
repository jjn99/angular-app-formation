import { Component } from '@angular/core';
import {SideNavToggle} from "../../../Model/config.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  isSideNavCollapsed= true;
  screenWidth=0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth= data.screenWidth;
    this.isSideNavCollapsed= data.collapsed;
  }


}
