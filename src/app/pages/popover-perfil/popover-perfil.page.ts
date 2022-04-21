import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { AlertasService } from '../../services/alertas.service';
import { PeticionesService } from '../../services/peticiones.service';
import { Camera,CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

declare var window:any;
@Component({
  selector: 'app-popover-perfil',
  templateUrl: './popover-perfil.page.html',
  styleUrls: ['./popover-perfil.page.scss'],
})
export class PopoverPerfilPage implements OnInit {
  usuario :Usuario={}
  imagen;
  constructor(private modalController:ModalController,
    private userService:UsuarioService,
    private alertService:AlertasService,
    private camera: Camera,
    private peticionesService:PeticionesService
  ) { }

  ngOnInit() {
    this.usuario=this.userService.getUsuario();
   console.log(this.usuario);
  }

  //poner la validaxion que cree en la otra app
  async actualizar(parametros:NgForm){
    if(parametros.invalid){return}
    const actualizado =await this.userService.actualizarUsuario(this.usuario);
    console.log(actualizado);
    
    if(actualizado){
      //se actualizo
      this.alertService.presentToast("se actualizo")
    }else{
      //no se pudieron guardar cambios
      this.alertService.presentToast("no se pudieron guardar los cambios")

    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
 
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
        this.peticionesService.subirArchivo(imageData);
        this.imagen=img;
        
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
       }, (err) => {
        // Handle error
       });
  }
  

  
}
