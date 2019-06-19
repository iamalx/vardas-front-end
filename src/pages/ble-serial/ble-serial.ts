import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';


/**
 * Generated class for the BleSerialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ble-serial',
  templateUrl: 'ble-serial.html',
})
export class BleSerialPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams
              public bluetoothSerial: BluetoothSerial) {
    this.checkIfBleEnabled()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BleSerialPage');
  }

  checkIfBleEnabled() {
    this.bluetoothSerial.isEnabled().then( res => {
      console.log("1# is eneabled: ")
    }, error => {
      console.log("#1 error:", error.message, error)
    })
  }
  
  listBondedDevices() {
    this.bluetoothSerial.list().then( res => {
      console.log("#2 list:", res)
    }, error => {
      console.log("#2 error:", error.message, error)
    })
  }


}
