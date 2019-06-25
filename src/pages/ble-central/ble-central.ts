import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble/index';
import { HomePage } from '../../pages/home/home';
import { Platform } from 'ionic-angular';


/**
 * Generated class for the BleCentralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ble-central',
  templateUrl: 'ble-central.html',
})
export class BleCentralPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ble: BLE,
              public plt: Platform ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BleCentralPage');
    this.plt.ready().then( readySource => {
      this.scan()
    });
  }

  scan() {
    console.log('scan =>')
    this.ble.scan([], 3 ).subscribe(device => {
      console.log( "scan", JSON.stringify(device));
      this.connect()
    }, error => {
      console.log("scan-error:", JSON.stringify(error) )
    });
    console.log('scan <=')

  }

  connect() {
    this.ble.stopScan().then( res => { 
      console.log("stop-scan", JSON.stringify(res) )
    })
    this.ble.connect("FE:4C:FA:56:CF:63").subscribe( res => {
      console.log("connect-res:", JSON.stringify(res))
      this.notify()
    }, error => {
      console.log("connect-error:", JSON.stringify(error) )
    })
  }

  notify() {
    console.log('nottify ==> ')
    this.ble.startNotification("FE:4C:FA:56:CF:63", "180D", "2A37").subscribe( data => {
      console.log('notify-data:', data)
    }, error => {
      console.log("notify-error:", JSON.stringify(error) )
    })
  }

  toBLE() {
    this.navCtrl.setRoot(HomePage);
  }
}
