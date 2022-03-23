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
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation:true,
    sourceType:this.camera.MediaType.ALLMEDIA,
    //sourceType:this.camera.PictureSourceType.CAMERA,
  }

  post={
    mensaje:'',
    coords:null,
    posicion:false
  }
  constructor(
    private peticionesService:PeticionesService,
    private navCtrl:NavController,
    private camera: Camera,
    private platform:Platform
    ) {
      this.platform.is('ios')
        console.log("es ios");
        
      
    }


  async crearPost(){
    console.log(this.post);
    const publicado =await this.peticionesService.crearPost(this.post);
    this.post={
      mensaje:'',
      coords:null,
      posicion:false
    }
    this.navCtrl.navigateRoot('/main/tabs/tab1')

    
  }

  sacarFoto(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img=window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);
      this.tempImages.push(img);
      
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

}
