import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private alertController: AlertController,private toastController: ToastController) { }

  async presentAlert(text:string) {
    const alert = await this.alertController.create({
      
      message: text,
      buttons: ['OK']
    });

    await alert.present();
}

async presentToast(text:string) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000
  });
  toast.present();
}
}
