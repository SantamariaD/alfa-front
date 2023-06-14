import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

  constructor() { }

  ngOnInit(): void {
  }



}
