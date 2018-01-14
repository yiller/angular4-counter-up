import { Directive, Inject, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CounterUpConfig, CounterUpConfigArgs } from './counter-up.config';

@Directive({
  selector: '[counter-up]'
})
export class CounterUpDirective implements OnInit, OnChanges, OnDestroy {

  @Input()
  set number(value: string | number) {
    if (typeof(value) === 'number') {
      value = value.toString();
    }
    this._isComma = /[0-9]+,[0-9]+/.test(value);
    value = value.replace(/,/g, '');
    // this._decimalPlaces = (value.split('.')[1] || []).length;
    if (this._beginAt > parseInt(value, 10)) {
      this._beginAt = parseInt(value, 10);
    }
    this._isTime = /[0-9]+:[0-9]+:[0-9]+/.test(value);
    // Convert time to total seconds
    if (this._isTime) {
      const times = value.split(':');
      let m = 1, s = 0;
      while (times.length > 0) {
        s += m * parseInt(times.pop(), 10);
        m *= 60;
      }
      this._number = s;
    } else {
      this._number = parseInt(value, 10);
    }
  }

  @Input()
  set offset(value: string) {
    if (/^\d+$/.test(value)) {
      this._offset = parseInt(value, 10);
    }
  }

  @Input()
  set formatter(value: string) {
    this._formatter = value;
  }

  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  private _number: number;
  private _isComma: boolean;
  private _isTime: boolean;
  private _seconds: number;
  private _decimalPlaces: number;
  private _delay: number;
  private _time: number;
  private _offset: number;
  private _beginAt: number;
  private _proceedNumber: number;
  private _timestamp: any;
  private _pause = false;
  private _formatter = '';

  constructor(
    protected el: ElementRef,
    @Inject(CounterUpConfig) config: CounterUpConfig
  ) {
    this._delay = config.delay;
    if (this._delay <= 0) {
      this._delay = 10;
    }
    this._time = config.time > 0 ? config.time : 100;
    this._beginAt = config.beginAt;
  }

  ngOnInit() {
    let number: number, type: string;
    if (this._isTime) {
      type = 'time';
    } else if (this._isComma) {
      type = 'comma';
    } else {
      type = 'text';
    }
    if (this.el.nativeElement.innerHTML.length === 0) {
      number = this._beginAt;
    } else {
      number = this[type + '2number'](this.el.nativeElement.innerHTML);
    }
    this._proceedNumber = number;
    this.el.nativeElement.innerHTML = this.format(this['number2' + type](number));
    this.start();
  }

  ngOnChanges(e) {
    if (e.number && !e.number.firstChange) {
      this.start();
    }
  }

  ngOnDestroy() {
    if (this._timestamp) {
      clearTimeout(this._timestamp);
    }
  }

  private _increment() {
    if (this._timestamp) {
      clearTimeout(this._timestamp);
    }
    let newValue = this._proceedNumber + this._offset, text: string, complete = false;
    if (newValue > this._number) {
      newValue = this._number;
      complete = true;
    }
    this._proceedNumber = newValue;
    if (this._isTime) {
      text = this.number2time(newValue);
    } else if (this._isComma) {
      text = this.number2comma(newValue);
    } else {
      text = this.number2text(newValue);
    }
    this.el.nativeElement.innerHTML = this.format(text);
    if (complete) {
      this.complete.emit({ target: this.el });
    } else if (!this._pause) {
      this._timestamp = setTimeout(() => this._increment(), this._delay);
    }
  }

  start() {
    if (this._isTime) {
      this._offset = 1;
      this._delay = 1000;
    } else if (!this._offset) {
      this._offset = parseInt(((this._number - this._proceedNumber) / this._time).toString(), 10);
      if (this._offset < 1) {
        this._offset = 1;
      }
    }
    this._increment();
  }

  pause() {
    this._pause = true;
  }

  resume() {
    this._pause = false;
    this._increment();
  }

  private time2number(text: string): number {
    text = /[0-9]+:[0-9]+:[0-9]+/.test(text) ? text : '00:00:00';
    const times = text.split(':');
    let m = 1, number = 0;
    while (times.length > 0) {
      number += m * parseInt(times.pop(), 10);
      m *= 60;
    }
    return number;
  }

  private number2time(number: number): string {
    const hours = parseInt((number / 3600).toString(), 10) % 24,
          minutes = parseInt((number / 60).toString(), 10) % 60,
          seconds = number % 60;
    return (hours < 10 ? '0' + hours : hours) + ':' +
          (minutes < 10 ? '0' + minutes : minutes) + ':' +
          (seconds < 10 ? '0' + seconds : seconds);

  }

  private comma2number(text: string): number {
    return parseInt(text.replace(/,/g, ''), 10);
  }

  private number2comma(number: number): string {
    let text = number.toString();
    while (/(\d+)(\d{3})/.test(text)) {
      text = text.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return text;
  }

  private text2number(text: string): number {
    return parseInt(text, 10);
  }

  private number2text(number: number): string {
    return number.toString();
  }

  private format(text: string): string {
    if (this._formatter.length === 0) {
      return text;
    }
    return this._formatter.replace(/%s/g, text);
  }

}
