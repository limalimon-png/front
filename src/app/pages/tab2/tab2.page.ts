import { Component } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { NavController, Platform } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@awesome-cordova-plugins/camera/ngx';
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
    usuario:{},
    img:this.tempImages

   
 
   
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
   
   
    this.post.usuario=this.user;
   
    
    const publicado:Post =await this.peticionesService.crearPost(this.post);

    
    this.post={
      mensaje:'',
      usuario:{},
      img:[]
 
    }
    publicado.img=this.tempImages;
    //this.peticionesService.actualizarPost(publicado);
    
    this.tempImages=[];
    this.navCtrl.navigateRoot('/main/tabs/tab1')

    
  }
  camara() {
    // capturar la imagen de la camara
    this.procesarImagen(  PictureSourceType.CAMERA );
  }
  async procesarImagen( source: PictureSourceType ){
    // configurar opciones
    const options = {
      quality: 80,
      allowEditing: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      source,  // recibida como parametro
    };
    // obtener la foto en 'image'
    try {
      const image = await this.camera.getPicture(options);
      // sanitizar la url de la imagen
     // const img = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
      // empujar la imagena nuestro array temporal
      this.tempImages.push( image );
      // llamar a servicio que sube la imagen al servidor
      this.peticionesService.subirArchivo( image.webPath );
    } catch ( err ) { // capturar error e indicarlo
        console.error( err );
      }
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
        
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
       // this.peticionesService.subirArchivo(imageData);
       }, (err) => {
        // Handle error
        console.log('error, no se pudo sacar foto',err);
        
       });
  }

  galeria2(){
    this.procesarImagen(  PictureSourceType.PHOTOLIBRARY );
  }

  galeria(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.ALLMEDIA,
      correctOrientation:true,
      //sourceType:this.camera.MediaType.ALLMEDIA,
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    }
    
    this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const img=window.Ionic.WebView.convertFileSrc(imageData);
        console.log(img);
        this.peticionesService.subirArchivo(img);
        this.tempImages.push(img);
        
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
      //  this.peticionesService.subirArchivo(imageData);
       }, (err) => {
        // Handle error
        console.log('error, no se pudo sacar foto',err);
        
       });
  }

}
