import { NgModule, ModuleWithProviders } from '@angular/core';
import { CounterUpDirective } from './counter-up.directive';
import { CounterUpConfig, CounterUpConfigArgs } from './counter-up-config';

@NgModule({
  declarations: [ CounterUpDirective ],
  exports: [ CounterUpDirective ]
})
export class CounterUpModule {

  static forRoot(config: CounterUpConfigArgs = {}): ModuleWithProviders {
    return {
      ngModule: CounterUpModule,
      providers: [
        { provide: CounterUpConfig, useValue: new CounterUpConfig(config) }
      ]
    };
  }
}
