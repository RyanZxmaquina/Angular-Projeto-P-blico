import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// Defina as rotas aqui
const routes: Routes = [
  { path: '', component: HomeComponent },  // Página inicial
  { path: 'about', component: AboutComponent }  // Página "Sobre"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Importa as rotas para a aplicação
  exports: [RouterModule]  // Torna o RouterModule acessível a outros módulos
})
export class AppRoutingModule {}
