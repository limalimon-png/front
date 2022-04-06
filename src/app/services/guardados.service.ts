import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Post } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class GuardadosService {


  postGuardado:Post[]=[];
  constructor(private _storage:Storage,
    private toastcrtl:ToastController
    ) { 
    this.init();
    this.cargarFavoritos();
  }


  //lo iniciamos
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this._storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:


  //Insertamos los datos y comprobamos si ya existen
  public set(pelicula:Post ) {
    let existe=false;
    let mensaje:string;
    
    //buscamos si esta el id de la peli seleccionada
    for (let peli of this.postGuardado){
      if(peli._id===pelicula._id){
        existe=true;
        
        break
      }
    }

    //en caso de que este la guardamos si no la quitamos
    if(existe){
      this.postGuardado=this.postGuardado.filter(informacion=> informacion._id!==pelicula._id);
      mensaje='se ha eliminado de favoritos';

    }else{
      this.postGuardado.push(pelicula);
      mensaje='se ha añadido a favoritos';
    }

    this._storage?.set('posts', this.postGuardado);
    this.presentToast(mensaje);
    console.log(this.postGuardado);
    return !existe;
  }

  //enviamos el mensaje para avisar que se ha añadido o quitado


  async presentToast(message:string) {
    const toast = await this.toastcrtl.create({
      message,
      duration: 1000
    });
    toast.present();
  }


  //cuando se inicia en el constructor lo llamamos
  //psamos una promesa
  async cargarFavoritos(){
    const peliculas= await this._storage.get('posts');
    this.postGuardado=peliculas || [];
    return this.postGuardado;

  }


  async existePelicula(id){
  
    await this.cargarFavoritos();
    const existe =this.postGuardado.find( peli => peli._id===id);
    return !!existe

  }

}
