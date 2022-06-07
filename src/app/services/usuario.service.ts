import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { promise } from 'protractor';
import { iconoPerfil, Usuario, getUsuario, UserLiked } from '../interfaces/interfaces';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { MovilStorageService } from './movil-storage.service';
import { catchError, finalize } from 'rxjs/operators';
import { url } from 'inspector';
import {throwError} from 'rxjs';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  imagenPorActualizar=''
  token: string = null;
  private usuario: Usuario = {}
  private emailPerfil :string;
  userAmigo:Usuario;
  userId;
  imagenNueva
  contador=0;
loading
  constructor(private http: HttpClient,
     private storage: Storage,
      private navController: NavController,
      private likesMovil:MovilStorageService,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController ) {
    this.storage.create();
  }
  getImagenNueva(){
    return this.imagenNueva;
  }


  login(email: string, password: string) {
    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data).subscribe(async res => {
        console.log(res);
        if (res['ok']) {
          
          
          this.userId=await this.getUserid(res['token']);
     
          
         //this.likesMovil.cargarPostLike(userId);
          await this.guardarToken(res['token']);
          resolve(true);
        } else {
          console.log(res['ok'], 'en el false');
          this.token = null;
          this.storage.clear();
          resolve(false);

        }


      });


    })

  }
  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.comprobarToken();

  }




  crearUsuario(usuario: Usuario) {

    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, usuario).subscribe(async res => {
        if (res['ok']) {


    await   this.guardarToken(res['token']);
          resolve(true);
        } else {

          this.token = null;
          this.storage.clear();
          resolve(false);

        }
      });

    });

  }

  //al hacer login si el token es correcto deja acceso al resto de la app
  async comprobarToken(): Promise<boolean> {

    await this.cargarToekn();

    if (!this.token) {
      this.navController.navigateRoot('/login')
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      //metemos los datos del header
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      
      


      this.http.get(`${URL}/user`, {headers}).subscribe(respuesta => {
        if (respuesta['ok']) {
          this.usuario = respuesta['usuario']
          resolve(true)
        } else {
          this.navController.navigateRoot('/login')
          resolve(false);
        }
      })


    });

  }

  async cargarToekn() {
    this.token = await this.storage.get('token') || null
  }

  getUsuario(){
    if(!this.usuario._id){
      this.comprobarToken();
    }
    return {...this.usuario};
  }





  actualizarUsuario(usuario:Usuario){
    return new Promise<boolean>(resolve => {

      //metemos los datos del header
      const encabezadoDeLaUri = new HttpHeaders({
        'x-token': this.token
      });

      //añadimos el header a las opciones que tiene la peticion
      const requestOptions = {
        headers: encabezadoDeLaUri,
      };


      this.http.post(`${URL}/user/update`, usuario,requestOptions).subscribe(respuesta => {
        if (respuesta['ok']) {
          this.guardarToken(respuesta['token'])
          resolve(true)
        } else {
          
          resolve(false);
        }
      })


    });

  }
//subir imagen para poder actualizarla
async subirArchivo(webPath: string) {
  // anunciar inicio de upload al usuario
  this.loading = await this.loadingCtrl.create({
    message: 'Enviando al servidor...'
  });

  
  //await this.loading.present();
  const blob = await fetch(webPath).then(r => r.blob());
  
  
  
  return new Promise<any> (  resolve => {
    // headers
    const headers = new HttpHeaders ({
      'x-token': this.token
    });
    const formData = new FormData();
    formData.append('image', blob, `image.jpg`);
    formData.append('id',  this.usuario._id);
    this.http.post<boolean>(`${ URL }/user/upload`, formData, { headers })
      .pipe(
        catchError(e => this.handleError(e)),
        finalize(() => this.loading.dismiss())
      )
      .subscribe((resp: any) => {
        if (resp.ok){
          this.showToast('Imagen subida correctamente');
          this.imagenNueva=resp.nombreImagen
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


  //cerrar sesion
  async logout(){
    this.token=null;
    this.usuario=null;
    await this.storage.clear();
    this.navController.navigateRoot('/login',{animated:true});
    this.likesMovil.borrarLikes();

  }

  async getFotoPerfil(id:string){



    return new Promise<string>(resolve => {

     


      this.http.get<iconoPerfil>(`${URL}/user/geticon/${id}`).subscribe(respuesta => {
        if (respuesta.imagen) {

          resolve(respuesta.imagen)
        } else {
          
          resolve(respuesta.ok+"");
        }
      })


    });

  

  }

  async getUsuariosLiked(id:string){



    return new Promise<UserLiked>(resolve => {

     


      this.http.get<UserLiked>(`${URL}/user/geticonname/${id}`).subscribe(respuesta => {
        if (respuesta.nombre) {

          resolve(respuesta)
        } else {
          
          resolve(respuesta);
        }
      })


    });

  

  }

  getEmail(){
    return this.emailPerfil;

  }
  setEmail(email:string){
    this.emailPerfil=email;
  }

  getUserAmigo(){
    
    return new Promise<Usuario>(resolve=>{
      this.http.get<getUsuario>(`${URL}/user/getusu/${this.userAmigo._id}`).subscribe(user=>{

        resolve(user.user[0]);
      });


    });
    
    //localhost:3000/user/getusu/626276d974acb01abc699544

  }
  getUserAmigo2(id){
    
    return new Promise<Usuario>(resolve=>{
      this.http.get<getUsuario>(`${URL}/user/getusu/${id}`).subscribe(user=>{

        resolve(user.user[0]);
      });


    });
    
    //localhost:3000/user/getusu/626276d974acb01abc699544

  }
  setUserAmigo(user:Usuario){
    this.userAmigo=user;
  }


  getUserid(token){

    return new Promise<string>(resolve => {

      //metemos los datos del header
      const headers = new HttpHeaders({
        'x-token': token
      });

      
      


      this.http.get(`${URL}/user/get`, {headers}).subscribe(respuesta => {
        if (respuesta['ok']) {
        
          resolve(respuesta['usuario'])
        } else {
          this.navController.navigateRoot('/login')
          resolve('');
        }
      })


    });
  }

  getUseridloc(){
    return this.userId;
  }
  setImagenPorActualizar(imagen:string){
    this.imagenPorActualizar=imagen;

  }
  async actualizarImagen(){
if(this.contador==1)return;
   await this.subirArchivo2(this.imagenPorActualizar);
   this.actualizarUsuario(this.usuario);
   this.contador=1;
  }

  async subirArchivo2(webPath: string) {
    // anunciar inicio de upload al usuario
    this.loading = await this.loadingCtrl.create({
      message: 'Enviando al servidor...'
    });
  
    
    //await this.loading.present();
    const blob = await fetch(webPath).then(r => r.blob());
    
    
    
    return new Promise<any> (  resolve => {
      // headers
      const headers = new HttpHeaders ({
        'x-token': this.token
      });
      const formData = new FormData();
      formData.append('image', blob, `image.jpg`);
      formData.append('id',  this.usuario._id);
      this.http.post<boolean>(`${ URL }/user/upload`, formData, { headers })
        .pipe(
          catchError(e => this.handleError(e)),
          finalize(() => this.loading.dismiss())
        )
        .subscribe((resp: any) => {
          if (resp.ok){
          
            this.imagenNueva=resp.nombreImagen
            resolve(true);
  
          } else {
            this.showToast('Error al subir la imagen!');
            resolve(false);
          }
        });
    });
  }

}
