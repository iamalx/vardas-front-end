import { Component } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { Platform } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Plugin, Cordova, CordovaProperty, IonicNativePlugin } from '@ionic-native/core';
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

  text: string = "Its not working"

  constructor(public bluele: BluetoothLE, public plt: Platform) {

    this.plt.ready().then((readySource) => {
      this.text = readySource;
      console.log(readySource)
      console.log('(<any>window).bluetoothle',(<any>window).cordova.bluele);
      (<any>window).cordova.bluele.initialize().then(ble => {
        console.log('blue', ble) // logs 'enabled'
        this.text = ble.status 
      }, error => {
          this.text = error
          console.log("error:", error)
        });
    });
  }

}
