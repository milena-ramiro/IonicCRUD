import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../Models/usuario.model';
import { Post } from './../../services/post';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {
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
    private storage: NativeStorage,
    private toast: ToastController
  ) {}


  ionViewWillEnter(){
   this.storage.getItem('session_storage').then((res)=>{
     console.log('RES:',res);
     this.usuario = res;
   });
  }

  logout() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }
}
