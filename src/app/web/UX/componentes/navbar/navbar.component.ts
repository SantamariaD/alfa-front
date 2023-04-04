import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/web/informacion/servicios/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userName = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('username') || '';
  }

  cerrarSesion() {
    if (!localStorage.getItem('token')) return console.log('No hay token');

    this.loginService.cerrarSesionService().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('imagen');
        this.router.navigate(['/login']);
      },
      error: (error) => console.log(error),
    });
  }
}
