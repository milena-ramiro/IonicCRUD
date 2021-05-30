import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Post } from './../../services/post';
import { Usuario } from './../Models/usuario.model';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  usuario: Usuario = {
    id: null,
    nome: '',
    usuario: '',
    senha: '',
    senha_original: '',
    nivel: '',
  };

  constructor(
    private router: Router,
    private provider: Post,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private service: Post
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.service.getById(+id).subscribe(result => {
        this.usuario.id = result.id,
        this.usuario.nome = result.nome,
        this.usuario.usuario = result.usuario,
        this.usuario.senha = result.senha,
        this.usuario.nivel = result.nivel
      });
    }
  }

  Usuario() {
    this.router.navigate(['/usuarios']);
  }

  Cadastrar(): void {
    this.provider.create(this.usuario).subscribe((data) => {
      this.router.navigate(['/usuarios']);
      this.provider.showMessage('Usuário criado com sucesso!');
    });
  }

  Editar(): void {
    this.provider.edit(this.usuario).subscribe((data) => {
      this.router.navigate(['/usuarios']);
      this.provider.showMessage('Usuário alterado com sucesso!');
    });
  }
}
