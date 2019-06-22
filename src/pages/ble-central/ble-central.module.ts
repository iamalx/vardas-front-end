import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleCentralPage } from './ble-central';

@NgModule({
  declarations: [
    BleCentralPage,
  ],
  imports: [
    IonicPageModule.forChild(BleCentralPage),
  ],
})
export class BleCentralPageModule {}
