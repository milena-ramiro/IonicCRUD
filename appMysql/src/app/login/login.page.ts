import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { Post } from './../../services/post';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario = {
    id: null,
    nome: '',
    usuario: '',
    senha: '',
    senha_original: '',
    nivel: '',
  };

  user: string = '';
  senha: string = '';

  constructor(
    private nativeStorage: NativeStorage,
    private router: Router,
    private provider: Post,
    private toast: ToastController
  ) {}

  ngOnInit() {}

  async login() {
    if(this.user == ""){
      const toast = await this.toast.create({
        message: 'Preencha o usuário',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
    }

    if(this.senha == ""){
      const toast = await this.toast.create({
        message: 'Preencha a senha',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      toast.present();
      return;
    }

    this.provider.login(this.user, this.senha).subscribe(async data => {
      console.log('USUARIO DATA:', data[0]);
      //sucesso
      if(data[0] != null){
        this.nativeStorage.setItem('session_storage', data[0]);
        console.log('STORAGE:', this.nativeStorage.getItem('session_storage'));
        this.router.navigate(['/folder']);
        const toast = await this.toast.create({
          message: "Logado com sucesso",
          duration: 1000,
          position: 'bottom',
          color: 'success'
        });
        toast.present();
        this.user = "";
        this.senha = "";
      }
      //Falha
      else{
        const toast = await this.toast.create({
          message: "Usuario ou senha incorretos!!!",
          duration: 2000,
          position: 'bottom',
          color: 'warning'
        });
        toast.present();
        this.user = "";
        this.senha = "";
      }


    });

  }
}
