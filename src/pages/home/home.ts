import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BleSerialPage } from '../../pages/ble-serial/ble-serial';
import { BleCentralPage } from '../../pages/ble-central/ble-central';
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
  toBLE() {
    console.log("To BLE")
    this.navCtrl.setRoot(BleCentralPage)
  }

}
