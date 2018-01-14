import { NgModule, ModuleWithProviders, InjectionToken, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterUpDirective } from './counter-up.directive';
import { CounterUpConfig, CounterUpConfigArgs } from './counter-up.config';

export const CounterUpOptions = new InjectionToken<CounterUpConfigArgs>('config');

export function factoryCounterUpConfig(config: CounterUpConfigArgs) {
  return new CounterUpConfig(config);
}

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CounterUpDirective ],
  exports: [ CounterUpDirective ]
})
export class CounterUpModule {

  public static forRoot(config: CounterUpConfigArgs = {}): ModuleWithProviders {
    return {
      ngModule: CounterUpModule,
      providers: [
        { provide: CounterUpOptions, useValue: config },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: config },
        { provide: CounterUpConfig, useFactory: factoryCounterUpConfig, deps: [ CounterUpOptions ] }
      ]
    };
  }
}
