import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BluetoothLE } from '@ionic-native/bluetooth-le';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BLE } from '@ionic-native/ble/index';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BleSerialPage } from '../pages/ble-serial/ble-serial';
import { BleCentralPage } from '../pages/ble-central/ble-central';

import { HeartBreathComponent } from '../components/heart-breath/heart-breath'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BleSerialPage, 
    BleCentralPage,
    HeartBreathComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BleSerialPage,
    BleCentralPage
  ],
  providers: [
    StatusBar,
    BluetoothLE,
    BluetoothSerial,
    BLE,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
