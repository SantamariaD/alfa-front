import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  isCollapsed = true;

  constructor() { }

  ngOnInit(): void {
    this.isCollapsed = true;
  }

}
