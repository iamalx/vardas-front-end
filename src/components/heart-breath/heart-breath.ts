import { Component } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { Platform } from 'ionic-angular';
import { stringify } from '@angular/core/src/render3/util';
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

  text: [string] = ['Hello World!'];

  constructor(  public bluetoothle: BluetoothLE,
                public plt: Platform ) {
    this.plt.ready().then( readySource => {
      this.text.push(readySource)
      this.initialize()
    });
  }

  initialize() {
    let params: object = {
      "request": true,
      "statusReceiver": false,
      "restoreKey": "bluetoothleplugin"
    };
    this.bluetoothle.initialize( params ).then( blue => {
      this.text.push(blue.status) // logs 'enabled'
      console.log(blue.status, "#3")
      this.scan()
    });
  }

  scan() {
    let scanParams: {
      "services": [null],
      "allowDuplicates": false,
      // "scanMode": bluetoothle.SCAN_MODE_LOW_LATENCY,
      // "matchMode": bluetoothle.MATCH_MODE_AGGRESSIVE,
      // "matchNum": bluetoothle.MATCH_NUM_MAX_ADVERTISEMENT,
      // "callbackType": bluetoothle.CALLBACK_TYPE_ALL_MATCHES,
    }

    this.bluetoothle.startScan( scanParams ).subscribe( any => {
      console.log(any.status, '#5')
        if( any['name']) {
          console.log(any['name'], JSON.stringify(any) ,"#5.5")   
        }
      })

    setTimeout( _ => {
      this.bluetoothle.stopScan().then( any => {
        console.log(any.status, "#6")
        this.connect()
      })
    }, 3000 )
  }

  connect() {
    let connectParams = {
      "address": "FE:4C:FA:56:CF:63"
    }
    this.bluetoothle.connect( connectParams ).subscribe( any => {
      console.log(any.status, "#7")
      console.log(Object.keys(any), '"#7.2')
      for( let i in any) {
        console.log(any[i], "#7.5")
      }
    }, error => {
      console.log(error.message, 'error', '#7.6')
      this.bluetoothle.close(connectParams).then( data => console.log(data.status, 'closed', "#7.7"))
    }) 
  }

  holder() {

    let discoverParams = {
      "address": "FE:4C:FA:56:CF:63",
      "clearCache": true
    }

    const readParams = {
      "address": "E0:F5:3C:B6:DE:5A",
      "service": '1800',
      "characteristic": '2A00',
    }

    // let pams = {
    //   address: "E0:F5:3C:B6:DE:5A",
    //   service: '180D',
    //   characteristic: "2A37"
    // }
    // this.bluetoothle.disconnect(connectParams).then( any => { 
    //   console.log(any, any.status, "#11")
    // })

      this.bluetoothle.discover(discoverParams).then( any => {
        console.log(any['status'], 'any.status', '#8')
        console.log(JSON.stringify(any), '#8.1')
      }, error => {
        console.log(error.message, error, 'error8.2')
      })

      this.bluetoothle.read(readParams).then( any => {
        console.log(JSON.stringify(any), "#9")
      }, error => { 
        console.log(JSON.stringify(error), 'error9.2')
      })

      // this.bluetoothle.subscribe( pams).subscribe( data => {
      //   console.log(JSON.stringify(data), '#10')
      // }, error => {
      //   console.log(error.message, error, 'error#10.2')
      // });
      // this.bluetoothle.read(readParams).then( any => {
      //   console.log(any, any.services)
      // }, error => {
      //   console.log(error.message, error, 'error8.2')
      // })


  }
}

