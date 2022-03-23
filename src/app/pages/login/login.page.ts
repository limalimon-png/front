import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { element } from 'protractor';
import { AlertasService } from '../../services/alertas.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Camera,CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
declare var window:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePadre', {static: true}) slidePadre:IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
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
    imagen:'av-1.png'

  }
  constructor(private usuarioService:UsuarioService,
    private navCtrl:NavController,
    private alertasService:AlertasService,
    private camera: Camera,
    ) { }

  ngOnInit() {
    this.slidePadre.lockSwipes(true);
  }


  async login(fLogin){
    if(fLogin.invalid)return;
   const valido= await this.usuarioService.login(this.loginUser.email,this.loginUser.password);
   console.log();
   
   this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
   if(valido){
     //entra
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



  
    
}


