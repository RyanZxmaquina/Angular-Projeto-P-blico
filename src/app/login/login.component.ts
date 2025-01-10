import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service'; // Não esqueça de importar o UserService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Referencie apenas o login.component.css
  standalone: true,
  imports: [FormsModule, CommonModule] // Adiciona FormsModule e CommonModule
})
export class LoginComponent {
  successMessage: string | null = null; // Adicionado successMessage
  errorMessage: string | null = null; // Adicionado errorMessage

  constructor(private userService: UserService) {}

  login(form: any) {
    const user = {
      email_address: form.value.email_address,
      user_password: form.value.user_password
    };

    this.userService.loginUser(user).subscribe(response => {
      console.log('Login bem-sucedido', response);
      this.successMessage = 'Login bem-sucedido';
      this.errorMessage = null;
    }, error => {
      console.error('Erro ao fazer login', error);
      this.errorMessage = 'Erro ao fazer login';
      this.successMessage = null;
    });
  }
}
