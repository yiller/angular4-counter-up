import { Component, ViewChild, ContentChild, DirectiveDecorator } from '@angular/core';
import { CounterUpDirective } from '../../module/counter-up.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  counterUp = 1000;

  change() {
    this.counterUp = 1500;
  }

  log() {
    console.log('Complete!');
  }

}
