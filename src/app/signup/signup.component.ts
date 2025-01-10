import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service'; // Não esqueça de importar o UserService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Adiciona FormsModule e CommonModule
})
export class SignupComponent {
  successMessage: string | null = null; // Adicionado successMessage
  errorMessage: string | null = null; // Adicionado errorMessage

  constructor(private userService: UserService) {}

  signup(form: any) {
    const user = {
      fullname: form.value.fullname, // Alterado para fullname
      email_address: form.value.email_address, // Alterado para email_address
      user_password: form.value.user_password // Alterado para user_password
    };

    this.userService.signupUser(user).subscribe(response => {
      console.log('Usuário cadastrado com sucesso', response);
      this.successMessage = 'Usuário cadastrado com sucesso!';
      this.errorMessage = null;
    }, error => {
      console.error('Erro ao cadastrar usuário', error);
      this.errorMessage = 'Erro ao cadastrar usuário. Tente novamente.';
      this.successMessage = null;
    });
  }
}
