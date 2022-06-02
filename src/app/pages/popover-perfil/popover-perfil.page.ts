import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { AlertasService } from '../../services/alertas.service';
import { PeticionesService } from '../../services/peticiones.service';
import { Camera,CameraOptions, PictureSourceType } from '@awesome-cordova-plugins/camera/ngx';

declare var window:any;
@Component({
  selector: 'app-popover-perfil',
  templateUrl: './popover-perfil.page.html',
  styleUrls: ['./popover-perfil.page.scss'],
})
export class PopoverPerfilPage implements OnInit {
  usuario :Usuario={}
  imagedata;
  imagen;
  constructor(private modalController:ModalController,
    private userService:UsuarioService,
    private alertService:AlertasService,
    private camera: Camera,
    private peticionesService:PeticionesService
  ) { }

  async ngOnInit() {
    
    
    this.usuario=this.userService.getUsuario();
   this.imagen=await this.userService.getFotoPerfil(this.usuario._id);
   this.imagen=this.usuario.imagen; 
   console.log('vuelve');
   
   console.log(this.imagen);
    console.log(this.usuario.desc);
    
   console.log(this.usuario);
  }

  //poner la validaxion que cree en la otra app
  async actualizar(parametros:NgForm){
    if(parametros.invalid){return}
   //await this.peticionesService.subirArchivo(this.imagedata);
   console.log('foto perfil antes',this.usuario.imagen);
    this.usuario.imagen=this.imagen;
    console.log(this.usuario.imagen);
    
    const actualizado =await this.userService.actualizarUsuario(this.usuario);
    //const img=this.usuario.imagen=await this.userService.getFotoPerfil(this.usuario._id);
    //console.log('foto perfil despues',img);
    
    console.log(actualizado);
    
    if(actualizado){
      //se actualizo
      this.alertService.presentToast("Se actualizó correctamente");
    
     
    }else{
      //no se pudieron guardar cambios
      this.alertService.presentToast("No se pudieron guardar los cambios")

    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      rule:true
      
 
    });
  }


  // galeria(){
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation:true,
  //     //sourceType:this.camera.MediaType.ALLMEDIA,
  //     sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  //   }
    
  //   this.camera.getPicture(options).then((imageData) => {
  //       // imageData is either a base64 encoded string or a file URI
  //       // If it's base64 (DATA_URL):
  //       const img=window.Ionic.WebView.convertFileSrc(imageData);
  //       console.log(img);
  //       //this.peticionesService.subirArchivo(imageData);
  //       this.imagen=imageData;
        
  //       //let base64Image = 'data:image/jpeg;base64,' + imageData;
  //      }, (err) => {
  //       // Handle error
  //      });
  // }
  
// galeria(){
//   this.procesarImagen( PictureSourceType.CAMERA);
// }
//   async procesarImagen( source: PictureSourceType ){
//     // configurar opciones
//     const options = {
//       quality: 80,
//       allowEditing: false,
//       correctOrientation: true,
//       destinationType: this.camera.DestinationType.FILE_URI,
//       source,  // recibida como parametro
//     };
//     // obtener la foto en 'image'
//     try {
//       const image = await this.camera.getPicture(options);
//       // sanitizar la url de la imagen
//      // const img = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
//       // empujar la imagena nuestro array temporal
//       const img=window.Ionic.WebView.convertFileSrc(image);
//       this.imagen= img ;
//       this.imagedata=image;
//       console.log('cambiar imagen',img);
//       // llamar a servicio que sube la imagen al servidor
//       this.userService.subirArchivo( image.webPath );
//     } catch ( err ) { // capturar error e indicarlo
//         console.error( err );
//       }
//     }


galeria(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.ALLMEDIA,
    correctOrientation:true,
    
  }
  
  this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img=window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);
      this.userService.subirArchivo(img);
      this.imagen=img;
      
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      await  this.userService.subirArchivo(imageData);
      console.log('imagen actualizada',this.imagen);
      this.imagen=this.userService.getImagenNueva();
      
     }, (err) => {
      // Handle error
      console.log('error, no se pudo sacar foto',err);
      
     });
}
}
