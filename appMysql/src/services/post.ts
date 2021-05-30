import {HttpClient, HttpHeaders} from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs-compat';
import 'rxjs-compat/add/operator/map';
import { Usuario } from './../app/Models/usuario.model';
import { UsuariosPageRoutingModule } from './../app/usuarios/usuarios-routing.module';

@Injectable()
export class Post{
  server: string = 'http://localhost:3001/usuarios';

  constructor(private http: HttpClient, private toastController: ToastController){

  }

  async showMessage(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
  }

  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.server, usuario);
  }

  edit(usuario: Usuario): Observable<Usuario>{
    const url = `${this.server}/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  get(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.server);
  }

  getById(id: number): Observable<Usuario>{
    const url = `${this.server}/${id}`;
    return this.http.get<Usuario>(url);
  }

  getWithPaginate(page: number, limit: number): Observable<Usuario[]>{
    const url = `${this.server}?_page=${page}&_limit=${limit}`;
    return this.http.get<Usuario[]>(url);
  }

  delete(id: number): Observable<Usuario>{
    const url = `${this.server}/${id}`;
    return this.http.delete<Usuario>(url);
  }

  searchByName(name: string): Observable<Usuario[]>{
    const url = `${this.server}?nome_like=${name}`;
    return this.http.get<Usuario[]>(url);
  }

  login(name: string, senha: string): Observable<Usuario>{
    const url = `${this.server}?nome=${name}&senha=${senha}`;
    return this.http.get<Usuario>(url);
  }

}
