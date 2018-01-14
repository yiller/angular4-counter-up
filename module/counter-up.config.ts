import { Injectable } from '@angular/core';

export interface CounterUpConfigArgs {
  delay?: number;
  time?: number;
  beginAt?: number;
}

export class CounterUpConfig implements CounterUpConfigArgs {

  delay = 10;
  time = 100;
  beginAt = 0;

  constructor(config: CounterUpConfigArgs = {}) {
    Object.assign(this, config);
  }

}
