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
      this.connect()
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
        // this.connect()
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
        if( any[i] == "disconnected") clearInterval(this.interval)
      }
      this.discover()
    
    }, error => {
      console.log(error.message, 'error', '#7.6')
      this.bluetoothle.close(connectParams).then( data => console.log(data.status, 'closed', "#7.7"))
    }) 
  }

  discover() {
    let discoverParams = {
      "address": "FE:4C:FA:56:CF:63",
      "clearCache": true
    }
    this.bluetoothle.discover(discoverParams).then( any => {
      console.log(any['status'], 'any.status', '#8')
      console.log(JSON.stringify(any), '#8.1')
      console.log("serviceUUID:", any['services'][0]["uuid"])
      this.read(any['services'][0]["uuid"])
    }, error => {
      console.log(error.message, error, 'error8.2')
    })
  }

  interval: any;
  read(service: string) {
    const readParams = {
      "address": "FE:4C:FA:56:CF:63",
      "service": service,
      "characteristic": '2A01',
    }
    // this.bluetoothle.write('dsd').then( data => {
    //   console.log("write", data, "#@")
    // })
    this.interval = setInterval( _ => {
      this.bluetoothle.read(readParams).then( data => {
        console.log(JSON.stringify(data['value']), "#9")
        let ndata = [];
          for(let i = 0; i < data['value'].length; i++) {
            if(data['value'].charCodeAt(i) != 254) ndata.push(data['value'].charCodeAt(i));
          }
        console.log(ndata);
      }, error => { 
        console.log(JSON.stringify(error), 'error9.2')
      })
    }, 500)
  }

  holder(service) {
    let pams = {
      address: "FE:4C:FA:56:CF:63",
      service: service,
      characteristic: "2A37"
    }
    let params = {
      WriteCharacteristicParams: null
    }

    this.bluetoothle.write(params.WriteCharacteristicParams).then( data => {
      console.log("write", data, "#@")
    })
    // this.bluetoothle.disconnect(connectParams).then( any => { 
    //   console.log(any, any.status, "#11")
    // })

    this.bluetoothle.subscribe( pams).subscribe( data => {
      console.log(JSON.stringify(data), '#10')
      let ndata = [];
      // for(let i = 0; i < data.value.length; i++) {
      //   if(data.value.charCodeAt(i) != 254) ndata.push(data.value.charCodeAt(i));
      // }
    
    console.log(ndata);
      this.read(service)
    }, error => {
      console.log(error.message, error, 'error#10.2')
    });
    // this.bluetoothle.read(readParams).then( any => {
    //   console.log(any, any.services)
    // }, error => {
    //   console.log(error.message, error, 'error8.2')
    // })

  }
}

