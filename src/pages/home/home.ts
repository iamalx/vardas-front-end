import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BleSerialPage } from '../../pages/ble-serial/ble-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  toSerial() {
    console.log("To serial")
    this.navCtrl.setRoot(BleSerialPage);
  }
 

}
