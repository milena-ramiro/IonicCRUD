import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './../Models/usuario.model';
import { Post } from './../../services/post';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios: Usuario[] = [];
  limit: number = 10;
  start: number = 0;
  nome: string = '';

  constructor(private router: Router, private provider: Post) {}

  ngOnInit() {}

  //Executado quando eu entro na tela
  ionViewWillEnter() {
    this.usuarios = [];
    this.start = 0;
    this.carregar();
  }

  addUsuario() {
    this.router.navigate(['add-usuario']);
  }

  editar(id: number) {
    this.router.navigate(['/add-usuario/' + id]);
  }

  excluir(id: number) {
    console.log(id);
    this.provider.delete(id).subscribe(() => {
      this.ionViewWillEnter();
    });
  }

  mostrarUsuario(id: number): void {
    this.router.navigate(['/mostrar-usuario/' + id]);
  }

  carregar() {
    this.usuarios = [];
    return new Promise((resolve) => {
      console.log(this.start);
      this.provider
        .getWithPaginate(this.start, this.limit)
        .subscribe((data) => {
          if (data.values() == null) {
            console.log('Carregando do inicio');
            this.ionViewWillEnter();
          } else {
            for (let usuario of data.values()) {
              this.usuarios.push(usuario);
            }
          }

          resolve(true);
        });
    });
  }

  filtrar(nome: string) {
    this.usuarios = [];
    return new Promise((resolve) => {
      this.provider.searchByName(nome).subscribe((data) => {
        for (let usuario of data.values()) {
          this.usuarios.push(usuario);
        }
        resolve(true);
      });
    });
  }

  //atualizar list view
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  //barra de rolagem
  loadData(event) {
    this.start += 1;
    setTimeout(() => {
      this.carregar().then(() => {
        event.target.complete();
      });
    }, 500);
  }
}
