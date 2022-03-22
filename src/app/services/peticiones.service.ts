import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Respuesta } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  URL =environment.url;
  paginaPost=0;

  constructor(private http:HttpClient,private userService:UsuarioService) { }

  getPosts(refresh:boolean=false){
    if(refresh)this.paginaPost=0;
     
    this.paginaPost++;
    return this.http.get<Respuesta>(`${this.URL}/posts?pagina=${this.paginaPost}`);
  }

  crearPost(post){
    const headers=new HttpHeaders({
      'x-token':this.userService.token
    });
    const requestOptions = {
      headers: headers,
    };
    this.http.post(`${this.URL}/posts`,post,{headers}).subscribe(respuesta=>{
      console.log(respuesta);
      
    })
  }
}
