import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from './../../services/post';

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.page.html',
  styleUrls: ['./mostrar-usuario.page.scss'],
})
export class MostrarUsuarioPage implements OnInit {

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
    private route: ActivatedRoute,
    private service: Post
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('ID:', id);
    this.service.getById(id).subscribe((result) => {
      this.usuario = result;
    });
  }

  voltar(): void {
    this.router.navigate(['/usuarios']);
  }
}
