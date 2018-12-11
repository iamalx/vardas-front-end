import { Component } from '@angular/core';

/**
 * Generated class for the HeartBreathComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'heart-breath',
  templateUrl: 'heart-breath.html'
})
export class HeartBreathComponent {

  text: string;

  constructor() {
    console.log('Hello HeartBreathComponent Component');
    this.text = 'Hello World!!!!';
  }

}
