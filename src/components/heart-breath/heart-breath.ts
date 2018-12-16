import { Component } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the HeartBreathComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var cordova: any;
@Component({
  selector: 'heart-breath',
  templateUrl: 'heart-breath.html'
})
export class HeartBreathComponent {

  text: string;

  constructor(  public bluetoothle: BluetoothLE,
                public plt: Platform) {
   // console.log('Hello HeartBreathComponent ');
    this.text = 'Hello World!!!!';

    this.plt.ready().then((readySource) => {
      this.text = readySource;
      this.bluetoothle.initialize().then(blue => {
        this.text = blue.status // logs 'enabled'
        if(blue.status == 'disabled') {
          this.bluetoothle.enable()     
        }
      }); 
    });
  }
}

