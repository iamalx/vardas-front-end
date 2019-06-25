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
      // this.initialize()
    });
  }

  //location
  //disconnect, stopsubscribe
  //update
  //write
  //bond
  //merge PR

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
        if( any[i] == "disconnected") {
          clearInterval(this.interval)
          this.bluetoothle.disconnect(connectParams).then( _ => {
            console.log(_ , "#disconencted")
          })
        }
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
      // this.read(any['services'][3]["uuid"])
      console.log("discover-services", any['services'][3]["uuid"])
      this.write(any['services'][3]["uuid"])
      // this.bond(any['services'][3]["uuid"])
      this.subscribe(any['services'][3]["uuid"])
    }, error => {
      console.log(error.message, error, 'error8.2')
    })
  }

  bond(service: any) {
    this.bluetoothle.bond( {'address': "FE:4C:FA:56:CF:63" } ).subscribe( res => {
      console.log('bond-res:', JSON.stringify(res))
    }, error => {
      console.log(error.message, 'error13')
    })
  }
  interval: any;

  write(service: any) {
    const readParams = {
      "address": "FE:4C:FA:56:CF:63",
      "service": service,
      "characteristic": "2A37",
      "value": "V3JpdGUgSGVsbG8gV29ybGQ=",
      "type": "response"
      // "descriptor": "2902"
    }
    console.log("write===>")
    this.bluetoothle.write(readParams).then( res => {
      console.log(" write-res :", JSON.stringify(res.value) )
    }, error => {
      console.log( JSON.stringify(error), 'error14')
    })
  }

  read(service: string) {
    const readParams = {
      "address": "FE:4C:FA:56:CF:63",
      "service": service,
      "characteristic": "2A37",
      // "descriptor": "2902"
    }
    // this.bluetoothle.write('dsd').then( data => {
    //   console.log("write", data, "#@")
    // })
    console.log('service:', service)
    this.subscribe(service)
    this.writeDescriptor(service)
    this.notify(service)
    this.interval = setInterval( _ => {
      this.bluetoothle.read(readParams).then( data => {
        console.log('data:',JSON.stringify(data))
        console.log(JSON.stringify(data['value']), "#9")
        // let ndata = [];
        //   for(let i = 0; i < data['value'].length; i++) {
        //     if(data['value'].charCodeAt(i) != 254) ndata.push(data['value'].charCodeAt(i));
        //   }
        // console.log(ndata);
      }, error => { 
        console.log(JSON.stringify(error), 'error9.2')
      })
    }, 10000)
  }
//subs to heart rate measmnt characteristic 180D
  subscribe(service) {
    const readPar = {
      "address": "FE:4C:FA:56:CF:63",
      "service": service,
      "characteristic": '2A37',
      isNotification: null,
    }
    this.bluetoothle.subscribe(readPar).subscribe( data => {
      console.log(JSON.stringify(data), '#10')
    }, error => {
      console.log(error.message, error, 'error#10.2')
    });
  }

  notify(service) {
    var params = {
      "service": service,
      "characteristic": '2A37',
      "value":"U3Vic2NyaWJlIEhlbGxvIFdvcmxk" //Subscribe Hello World
    };
    console.log("notify" )
    this.bluetoothle.notify(params).then( any => {
      console.log("#notify", any)
    }, error => {
      console.log(error, "error:notify" )
    })
  }

  writeDescriptor(service: any) {
    var string = "Hello World";
    var bytes = this.bluetoothle.stringToBytes(string);
    var encodedString = this.bluetoothle.bytesToEncodedString(bytes);
    var params = {
      "address": "FE:4C:FA:56:CF:63",
      "service": service,
      "characteristic": '2A37',
      "descriptor": "2902",
      "value": encodedString, //Subscribe Hello World
    };
    console.log('#12', params)
    this.bluetoothle.writeDescriptor(params).then( any => {
      console.log("#12-writeDescritor:", )
    }, error => {
      console.log(JSON.stringify(error), "#12")
    })
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

    // this.bluetoothle.disconnect(connectParams).then( any => { 
    //   console.log(any, any.status, "#11")
    // })

    // this.bluetoothle.read(readParams).then( any => {
    //   console.log(any, any.services)
    // }, error => {
    //   console.log(error.message, error, 'error8.2')
    // })

  }
}

