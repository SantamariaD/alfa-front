import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  /**
   * @Variable isCollapse: controla el colapse si hay submenus
   */
  isCollapsed = true;

  /**
   * @Variable enviromentsModulos: controla el colapse si hay submenus
   */
  enviromentsModulos = environment.modulosAplicacion;

  constructor() { }

  ngOnInit(): void {
    this.isCollapsed = true;
  }

}
