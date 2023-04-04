import { Component, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBanderaCargandoPeticion } from './web/informacion/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  isCollapsed = true;
  login = false;
  spinerPeticion = false;

  constructor(private store: Store) {}

  ngDoCheck(): void {
    this.store
      .select(selectBanderaCargandoPeticion)
      .subscribe((bandera: boolean) => (this.spinerPeticion = bandera));
      this.login = localStorage.getItem('token') ? true : false;
  }
}
