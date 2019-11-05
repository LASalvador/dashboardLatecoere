import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/icons",
    title: "Linhas",
    icon: "icon-pallet",
    class: ""
  },
  {
    path: "/maps",
    title: "Produtos",
    icon: "icon-pin",
    class: "" 
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    var sidebar = document.getElementsByClassName('sidebar')[0];
    if(sidebar != undefined){
      sidebar.setAttribute('data',"blue");
    } 
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  changeSidebarColor(color){
    
  }
}
