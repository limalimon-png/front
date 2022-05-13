import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { promise } from 'protractor';
import { iconoPerfil, Usuario, getUsuario, UserLiked } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;
  private usuario: Usuario = {}
  private emailPerfil :string;
  userAmigo:Usuario;

  constructor(private http: HttpClient, private storage: Storage, private navController: NavController) {
    this.storage.create();
  }


  login(email: string, password: string) {
    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data).subscribe(async res => {
        console.log(res);
        if (res['ok']) {
          console.log(res['ok'], 'en el true');

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


    await      this.guardarToken(res['token']);
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

      
      


      this.http.get(`${URL}/user/`, {headers}).subscribe(respuesta => {
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

  //cerrar sesion
  logout(){
    this.token=null;
    this.usuario=null;
    this.storage.clear();
    this.navController.navigateRoot('/login',{animated:true});

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

     


      this.http.get<UserLiked>(`${URL}/user/geticon/${id}`).subscribe(respuesta => {
        if (respuesta.imagen) {

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
  setUserAmigo(user:Usuario){
    this.userAmigo=user;
  }



  

}
