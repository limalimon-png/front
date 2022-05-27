import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

import { environment } from '../../environments/environment';
import { Post, Respuesta, RespuestaPerfil } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
// UI Loading + Toast
import {LoadingController, ToastController} from '@ionic/angular';
 
// Manejo de errores
import {catchError, finalize} from 'rxjs/operators';
import {throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  URL =environment.url;
  paginaPost=0;
  loading: any; // indicador progreso de carga de imagen
  nuevaPublicacion=new EventEmitter<Post>()

  constructor(private http:HttpClient,
    private userService:UsuarioService,
    private fileTransfer:FileTransfer,
    private loadingCtrl: LoadingController,
private toastCtrl: ToastController 
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

  actualizarPost  (post){
    return new Promise<boolean>(resolve => {
      
  
      //metemos los datos del header
     

      //añadimos el header a las opciones que tiene la peticion
      


      this.http.post(`${this.URL}/posts/update`, post).subscribe(respuesta => {
        if (respuesta['ok']) {
         console.log('resuelto');
         
          resolve(true)
        } else {
          
          resolve(false)
       }
      })


    });

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
        resolve(respuesta['post']);
        
      })


    })
  }


  // subirArchivo(file:string){
  //   const options:FileUploadOptions={
  //     fileKey:'image',
  //     headers:{
  //       'x-token':this.userService.token
  //     }
  //   }


  //   const fileTransfer:FileTransferObject=this.fileTransfer.create();
  //   console.log('filesssss',fileTransfer);
    

  //   fileTransfer.upload(file,`${this.URL}/posts/upload`,options).then(data=>{
  //     console.log(data);

  //   }).catch(error=>{
  //     console.log("error",error);
      
  //   });
  // }

  async subirArchivo(webPath: string) {
    // anunciar inicio de upload al usuario
    this.loading = await this.loadingCtrl.create({
      message: 'Enviando al servidor...'
    });
    
    //await this.loading.present();
    const blob = await fetch(webPath).then(r => r.blob());
    return new Promise<boolean> (  resolve => {

      // headers
      const headers = new HttpHeaders ({
        'x-token': this.userService.token
      });

      const formData = new FormData();

      formData.append('image', blob, `image.jpg`);
      
      this.http.post<boolean>(`${ this.URL }/posts/upload`, formData, { headers })
        .pipe(
          catchError(e => this.handleError(e)),
          finalize(() => this.loading.dismiss())
        )
        .subscribe((resp: any) => {
          if (resp.ok){
            this.showToast('Imagen subida correctamente');
            resolve(true);
          } else {
            this.showToast('Error al subir la imagen!');
            resolve(false);
          }
        });
    });
  }
   
    // manejo de errores
    private handleError(error: any) {
      const errMsg = error.message ? error.message : error.toString();
      return throwError(errMsg);
    }
   
    // informar al usuario con Toast
    private async showToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 2500,
        position: 'top'
      });
      toast.present();
  }

  getPublicacionesPerfil(id:string){
    
    return this.http.get<RespuestaPerfil>(`${this.URL}/posts/perfil/${id}`);
 
  }
  getPublicacionesPerfilPorEmail(email:string){
    
    return this.http.get<RespuestaPerfil>(`${this.URL}/posts/perfilGente/${email}`);
 
  }
//localhost:3000/posts/perfil/620cb0486e46615daab2e754
}
