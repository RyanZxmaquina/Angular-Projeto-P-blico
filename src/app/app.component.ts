import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  template: `
    <h1></h1>
    <nav>
      <a routerLink="/">Home</a> | 
      <a routerLink="/about">Sobre</a> | 
      <a routerLink="/login">Login</a> | 
      <a routerLink="/signup">Cadastro</a>  <!-- Link para a página de Cadastro -->
    </nav>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {}
