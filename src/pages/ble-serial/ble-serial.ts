import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HomePage } from '../../pages/home/home';


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
              public navParams: NavParams,
              public bluetoothSerial: BluetoothSerial) {
    // this.bluetoothSerial.enable().then( _ => {})
    this.enableBle()
  }

  //1) location permission 

  ionViewDidLoad() {
    console.log('ionViewDidLoad BleSerialPage');
  }

  enableBle() {
    this.bluetoothSerial.enable().then( res => {
      console.log('res-enable:', res)
      this.checkIfBleEnabled()
    })
  }

  checkIfBleEnabled() {
    this.bluetoothSerial.isEnabled().then( res => {
      console.log("1# is eneabled: ")
      this.listBondedDevices()
    }, error => {
      console.log("#1 error:", error.message, error)
    })
  }
  
  listBondedDevices() {
    this.bluetoothSerial.list().then( res => {
      console.log("#2 list:", JSON.stringify(res))
      this.connectDevice(res[0]['address'])
    }, error => {
      console.log("#2 error:", error.message, error)
    })
  }

  connectDevice(address: any) {
    let connectParams = {
      "address": address
    }
    console.log('address:', address)
    this.bluetoothSerial.write("ahhhhhhh\n");
    this.bluetoothSerial.connect(address).subscribe( res => {
      console.log("#3 connect:", res)
      this.read()
    }, error => {
      console.log("#3 error:", error)
    })
  }

  read() {
    this.bluetoothSerial.read().then( data => {
      console.log("#3 connect:", data)
    }, error => {
      console.log("#3 error:", error.message, error)
    })
  }
  toBLE() {
    this.navCtrl.setRoot(HomePage);
  }
}
