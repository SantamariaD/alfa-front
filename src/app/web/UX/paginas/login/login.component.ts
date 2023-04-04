import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/web/informacion/servicios/login/login.service';
import { guardarUsuario } from 'src/app/web/informacion/state/usuario/usuario.action';
import { HttpClientServiceInterface } from '../../../informacion/interface/httpService';
import { LoginServiceInterface } from '../../../informacion/interface/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}

  enviarForm() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (respuestalogin: HttpClientServiceInterface<LoginServiceInterface>) => {
          localStorage.setItem('token', respuestalogin.payload.token);
          localStorage.setItem('rol', respuestalogin.payload.usuario.rol);
          localStorage.setItem('id', respuestalogin.payload.usuario.id.toString());
          localStorage.setItem(
            'username',
            respuestalogin.payload.usuario.username
          );
          localStorage.setItem(
            'imagen',
            respuestalogin.payload.usuario.imagen
          );
           this.store.dispatch(
            guardarUsuario({ usuario: respuestalogin.payload.usuario })
          );
          this.router.navigate(['/home']);
        }
      );
  }
}
