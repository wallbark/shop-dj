import { Usuario1 } from './../../../models/usuario';
import { UsuarioService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {


  usuario = {} as Usuario1;
  usuarios: Usuario1[] = [];

  constructor(private usuarioService: UsuarioService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getUsuario();
  }
  // defini se um produto será criado ou atualizado
  // tslint:disable-next-line:typedef
  saveUsuario(form: NgForm) {
    if (this.usuario.id !== undefined && this.usuario.login !== undefined ) {
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.cleanForm(form);
        alert('Usuario cadastrado com suceosso');
      });
    } else {
      this.usuarioService.saveUsuario(this.usuario).subscribe(() => {
        this.cleanForm(form);
        alert('Usuario cadastrado com suceosso');
      });
    }
  }
  // Chama o serviço para listar os produtos
  // tslint:disable-next-line:typedef
  getUsuario() {
    this.usuarioService.getUsuario().subscribe((produtos: Usuario1 []) => {
      this.usuarios = produtos;
    });
  }
  // deleta um produto
  // tslint:disable-next-line:typedef
  deleteUsuario(usuario: Usuario1) {
    this.usuarioService.deleteUsuario(usuario).subscribe(() => {
      this.getUsuario();
    });
  }
  // copia o produto para ser editado.
  // tslint:disable-next-line:typedef
  editUsuario(usuario: Usuario1) {
    this.usuario = { ...usuario };
  }


  // limpa o formulario
  // tslint:disable-next-line:typedef
  cleanForm(form: NgForm) {
    this.getUsuario();
    form.resetForm();
    this.usuario = {} as Usuario1;
  }
}
