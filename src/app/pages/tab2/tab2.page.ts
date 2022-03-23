import { Component } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { NavController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';


declare var window:any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages:string[]=[];
 

  post={
    mensaje:'',
    coords:null,
    posicion:false
  }
  constructor(
    private peticionesService:PeticionesService,
    private navCtrl:NavController,
    private camera: Camera,
    
    
    ) {
      this.tempImages.push('../assets/perro-1.jpg')
      this.tempImages.push('../assets/perro-2.jpg')
      this.tempImages.push('../assets/video.mp4')
     
        
      
    }


  async crearPost(){
    console.log(this.post);
    const publicado =await this.peticionesService.crearPost(this.post);
    this.post={
      mensaje:'',
      coords:null,
      posicion:false
    }
    this.tempImages=[];
    this.navCtrl.navigateRoot('/main/tabs/tab1')

    
  }

  sacarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
      correctOrientation:true,
      //sourceType:this.camera.MediaType.ALLMEDIA,
      //sourceType:this.camera.PictureSourceType.CAMERA,
    }
    
    this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const img=window.Ionic.WebView.convertFileSrc(imageData);
        console.log(img);
        this.peticionesService.subirArchivo(imageData);
        this.tempImages.push(img);
        
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
       }, (err) => {
        // Handle error
       });
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
        this.peticionesService.subirArchivo(imageData);
        this.tempImages.push(img);
        
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
       }, (err) => {
        // Handle error
       });
  }

}
