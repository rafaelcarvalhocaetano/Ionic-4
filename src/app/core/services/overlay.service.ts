import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  // method generic of alerts
  async alert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }

  // method generic of loading
  async loading(oprtion?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Loading ...',
      ...oprtion
    });
    await loading.present();
    return loading;
  }

  // method generic of toast
  async toast(options?: ToastOptions): Promise<HTMLIonToastElement> {
    const toasting = await this.toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok',
      ...options
    });
    await toasting.present();
    return toasting;
  }
}
