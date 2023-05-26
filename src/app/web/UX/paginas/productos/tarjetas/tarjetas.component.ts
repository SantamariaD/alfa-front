import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/web/informacion/interface/producto';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent implements OnInit {

  //@Productos

  productos:Producto[]=[
{
  nombre:'Coca-cola',
categoria:'bebidas',
precio:25,
descripcion:'Refresco sabor cola de dieta con edulcorantes artificiales y cafeína',
imagen:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},
{
  nombre:'Coca-cola',
categoria:'bebidas',
precio:25,
descripcion:'Refresco sabor cola',
imagen:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},
{
  nombre:'Coca-cola',
categoria:'bebidas',
precio:25,
descripcion:'Refresco sabor cola',
imagen:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},
{
  nombre:'Coca-cola',
categoria:'bebidas',
precio:25,
descripcion:'Refresco sabor cola',
imagen:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},
{
  nombre:'Coca-cola',
categoria:'bebidas',
precio:25,
descripcion:'Refresco sabor cola',
imagen:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},
{
  nombre:'Coca-cola',
categoria:'bebidas',
precio:25,
descripcion:'Refresco sabor cola',
imagen:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},
{
  nombre:'Coca-cola',
categoria:'bebidas',
precio:25,
descripcion:'Refresco sabor cola',
imagen:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
},
{
  nombre:'Coca-cola',
categoria:'bebidas',
precio:25,
descripcion:'Refresco sabor cola',
imagen:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
