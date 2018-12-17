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
                public plt: Platform ) {
   // console.log('Hello HeartBreathComponent ');
    this.text = 'Hello World!!!!';

    this.plt.ready().then( readySource => {
      this.text = readySource;
      //let initializeResult: object;
      let params: object = {
        "request": true,
        "statusReceiver": false,
        "restoreKey": "bluetoothleplugin"
      };

      this.bluetoothle.initialize( params ).then( blue => {
        this.text = blue.status // logs 'enabled'
        console.log(blue.status, "#3")
      });

      //connect to device to see clallback 
      const info = this.bluetoothle.getAdapterInfo()

      for( var i in info ) {
        console.log(i, "#4") 
      }

      let scanParams:{
        "services": [],
        "allowDuplicates": true,
        "scanMode": bluetoothle.SCAN_MODE_LOW_LATENCY,
        "matchMode": bluetoothle.MATCH_MODE_AGGRESSIVE,
        "matchNum": bluetoothle.MATCH_NUM_MAX_ADVERTISEMENT,
        "callbackType": bluetoothle.CALLBACK_TYPE_ALL_MATCHES,
      }

      this.bluetoothle.startScan( scanParams ).subscribe( any => {
        console.log(any.status, '#5')
          if( any['name']) {
            console.log(any['name'], 'advert' ,"#5.5")   
            // console.log(any[ "advertisement"]["serviceUuids"], 'uuids' ,"#5.5")
            // console.log(any[ "isConnectable"], 'connectable?' ,"#5.5")
            // console.log(any["serviceData"], 'serviceData' ,"#5.5")
            // console.log(any['name'], 'name' ,"#5.5")
          }
        })

      

      setTimeout( _ => {
        this.bluetoothle.stopScan().then( any => {
          console.log(any.status, "#6")
          // for( let i in any) {
          //   console.log(any[i], "#6.5")
          // }
        })
      }, 7000 )

      let connectParams = {
        "address": "E0:F5:3C:B6:DE:5A"
      }

      let discoverParams: {
        "address": "E0:F5:3C:B6:DE:5A",
        "services": []
      }

      // this.bluetoothle.disconnect(connectParams).then( any => { 
      //   console.log(any, any.status, "#11")
      // })

      this.bluetoothle.connect( connectParams ).subscribe( any => {
        console.log(any.status, "#7")
        console.log(Object.keys(any), '"#7.2')
        for( let i in any) {
          console.log(any[i], "#7.5")
        }

        this.bluetoothle.services(discoverParams).then( any => {
          console.log(any, 'any', '#8')
        
        }, error => {
          console.log(error.message, 'error8.2')
        })

      }, error => {
          console.log(error.message, 'error', '#7.6')
          this.bluetoothle.close(connectParams).then( data => console.log(data.status, 'closed', "#7.7"))
      })

      // this.bluetoothle.characteristics()

    });
  }
}

