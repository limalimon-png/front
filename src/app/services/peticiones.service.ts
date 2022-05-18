import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

import { environment } from '../../environments/environment';
import { Post, Respuesta, RespuestaPerfil } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  URL =environment.url;
  paginaPost=0;
  nuevaPublicacion=new EventEmitter<Post>()

  constructor(private http:HttpClient,
    private userService:UsuarioService,
    private fileTransfer:FileTransfer
    ) { }

  getPosts(refresh:boolean=false){
    if(refresh)this.paginaPost=0;
     
    this.paginaPost++;
    return this.http.get<Respuesta>(`${this.URL}/posts?pagina=${this.paginaPost}`);
  }

  getPost(id:string){
    return new Promise<Post>(resolve=>{
      this.http.get<Post>(`${this.URL}/posts/perfil2/${id}`).subscribe(post=>{
        resolve(post);
      })
    })
  
  }

  crearPost(post){
    const headers=new HttpHeaders({
      'x-token':this.userService.token
    });
    const requestOptions = {
      headers: headers,
    };


    return new Promise(resolve=>{

      this.http.post(`${this.URL}/posts`,post,{headers}).subscribe(respuesta=>{
        console.log(respuesta);
        this.nuevaPublicacion.emit(respuesta['post'])
        resolve(true);
        
      })


    })
  }


  subirArchivo(file:string){
    const options:FileUploadOptions={
      fileKey:'image',
      headers:{
        'x-token':this.userService.token
      }
    }


    const fileTransfer:FileTransferObject=this.fileTransfer.create();

    fileTransfer.upload(file,`${this.URL}/posts/upload`,options).then(data=>{
      console.log(data);

    }).catch(error=>{
      console.log("error",error);
      
    });
  }


  getPublicacionesPerfil(id:string){
    
    return this.http.get<RespuestaPerfil>(`${this.URL}/posts/perfil/${id}`);
 
  }
  getPublicacionesPerfilPorEmail(email:string){
    
    return this.http.get<RespuestaPerfil>(`${this.URL}/posts/perfilGente/${email}`);
 
  }
//localhost:3000/posts/perfil/620cb0486e46615daab2e754
}
