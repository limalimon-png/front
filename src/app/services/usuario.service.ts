import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { promise } from 'protractor';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;
  private usuario: Usuario = {}

  constructor(private http: HttpClient, private storage: Storage, private navController: NavController) {
    this.storage.create();
  }


  login(email: string, password: string) {
    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data).subscribe(res => {
        console.log(res);
        if (res['ok']) {
          console.log(res['ok'], 'en el true');

          this.guardarToken(res['token']);
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

  }




  crearUsuario(usuario: Usuario) {

    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, usuario).subscribe(res => {
        if (res['ok']) {


          this.guardarToken(res['token']);
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
      const encabezadoDeLaUri = new HttpHeaders({
        'x-token': this.token
      });

      //añadimos el header a las opciones que tiene la peticion
      const requestOptions = {
        headers: encabezadoDeLaUri,
      };


      this.http.get(`${URL}/user/`, requestOptions).subscribe(respuesta => {
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
}
