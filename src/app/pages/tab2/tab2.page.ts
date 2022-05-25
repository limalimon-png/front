import { Component } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { NavController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { UsuarioService } from '../../services/usuario.service';
import { Post } from 'src/app/interfaces/interfaces';


declare var window:any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages=[];
  
 user;

  post={
    mensaje:'',
    img:[],
    usuario:{}

   
 
   
  }
  constructor(
    private peticionesService:PeticionesService,
    private navCtrl:NavController,
    private camera: Camera,
    private userService:UsuarioService
    
    
    ) {
     this.user=this.userService.getUsuario()
   
      
      
     
        
      
    }


  async crearPost(){
    console.log(this.post);
    //this.post.image= this.tempImages;
    //console.log('imagenes',this.post.image);
    this.post.usuario=this.user;
    this.post.img=this.tempImages;
    
    const publicado:Post =await this.peticionesService.crearPost(this.post);

    
    this.post={
      mensaje:'',
      img:[],
      usuario:{}
 
    }
    publicado.img=this.tempImages;
    this.peticionesService.actualizarPost(publicado);
    
    this.tempImages=[];
    this.navCtrl.navigateRoot('/main/tabs/tab1')

    
  }
  camara() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen( options );

  }
  procesarImagen( options: CameraOptions ) {

    this.camera.getPicture(options).then( ( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

       const img = window.Ionic.WebView.convertFileSrc( imageData );

      this.peticionesService.subirArchivo( imageData );
      this.tempImages.push( img );
      

     }, (err) => {
      // Handle error
      console.log('error, no se pudo sacar foto',err);
      
     });
  }

  sacarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
      correctOrientation:true,
      
    }
    
    this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const img=window.Ionic.WebView.convertFileSrc(imageData);
        console.log(img);
        this.peticionesService.subirArchivo(img);
        this.tempImages.push(img);
        
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.peticionesService.subirArchivo(imageData);
       }, (err) => {
        // Handle error
        console.log('error, no se pudo sacar foto',err);
        
       });
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
        this.tempImages.push(img);
        
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
       }, (err) => {
        // Handle error
       });
  }

}
