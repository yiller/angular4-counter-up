import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CounterUpModule } from '../../module/counter-up.module';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CounterUpModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
