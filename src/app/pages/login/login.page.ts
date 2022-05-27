import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { element } from 'protractor';
import { AlertasService } from '../../services/alertas.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Camera,CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { PeticionesService } from '../../services/peticiones.service';
import { MovilStorageService } from '../../services/movil-storage.service';
import { LikesService } from '../../services/likes.service';

import { Like, Post } from '../../interfaces/interfaces';
declare var window:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePadre', {static: true}) slidePadre:IonSlides;
  imagen:string='';
userId;
 posts:Post[]=[]
aux:{ok:boolean,posts:string[]}
  avatars = [
    {
      img: '/assets/avatars/av-2.png',
      seleccionado: true
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
   
  ];

  
  opcionesAvatar={
    
      slidesPerView: 3.5
  }
  loginUser={
    email:'test@test.com',
    password:'123456'
  };


  registerUser:Usuario={
    nombre:'guilletest',
    email:'test@test.com',
    password:'123456',
    imagen:this.subirImagen()

  }
  
  constructor(private usuarioService:UsuarioService,
    private navCtrl:NavController,
    private alertasService:AlertasService,
    private camera: Camera,
    private peticionesService:PeticionesService,
    private movilStorage:MovilStorageService,
    private likeService:LikesService
    ) { }

  ngOnInit() {
    this.slidePadre.lockSwipes(true);
  }

  subirImagen(){
    if(this.imagen==''){
      return '/assets/avatars/av-2.png'
    }else return this.imagen
  }
 
async prueba(){

  this.aux.posts.forEach(async element => {
    this.posts.push( await this.peticionesService.getPost(element));
    

    if(element==this.aux.posts[this.aux.posts.length-1]){
      console.log('termino');
      console.log('postsfiltrados',this.posts);
     console.log('length',this.posts.length);
     this.movilStorage.setPosts(this.posts);
     this.movilStorage.init();
     this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
  
    }
   })
}
  async login(fLogin){
    if(fLogin.invalid)return;
   const valido= await this.usuarioService.login(this.loginUser.email,this.loginUser.password);
  
   
   
   if(valido){
     //entra
    // //  this.movilStorage.init();
     this.userId= this.usuarioService.getUseridloc();
     
    this.aux=
    await this.likeService.getPostLike(this.userId)
    await this.prueba();
    
     
     this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});

   }else{
     //usuario y contraseña son incorrectos
     this.alertasService.presentAlert('Usuario y contraseña incorrectos');
   }
    console.log(this.loginUser);
    
    

  }

  async register(fRegister){
    if(fRegister.invalid)return;
    
    const valido =await this.usuarioService.crearUsuario(this.registerUser);

    if(valido){
      //entra
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    }else{
      //usuario y contraseña son incorrectos
      this.alertasService.presentAlert('Email en uso por favor, introduce uno nuevo');
    }

  }

  seleccionarAvatar(avatar){
    this.avatars.forEach(element=>{
      element.seleccionado=false;
    });
    avatar.seleccionado=true;
    this.registerUser.imagen=avatar.img;
    if(  this.registerUser.imagen == 'av-3.png'){
      console.log('coincide');
      
      this.galeria();
    }
  }

  btnLogin(){
    this.slidePadre.lockSwipes(false);
    this.slidePadre.slidePrev();
    this.slidePadre.lockSwipes(true);
    
    
  }
  btnRegistro(){
    this.slidePadre.lockSwipes(false);
    this.slidePadre.slideNext();
    this.slidePadre.lockSwipes(true);

}
galeria(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true,
    //sourceType:this.camera.MediaType.ALLMEDIA,
    sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  }
  
  this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img=window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);
      //this.peticionesService.subirArchivo(imageData);
      this.imagen=imageData;
      this.registerUser.imagen=imageData;
      
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
}

  
    
}


