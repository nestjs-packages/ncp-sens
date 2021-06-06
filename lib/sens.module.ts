import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AlimtalkClient, SmsClient } from '@pickk/sens';

import {
  SensModuleOptions,
  SensModuleAsyncOptions,
} from './interfaces/sens-options.interface';

@Module({})
export class SensModule {
  static forRoot(options: SensModuleOptions): DynamicModule {
    const providers: Provider[] = [];
    if (options.sms) {
      providers.push({
        provide: SmsClient,
        useValue: new SmsClient({
          ...options,
          ...options.sms,
        }),
      });
    }
    if (options.alimtalk) {
      providers.push({
        provide: AlimtalkClient,
        useValue: new AlimtalkClient({
          ...options,
          ...options.alimtalk,
        }),
      });
    }

    return {
      global: true,
      module: SensModule,
      providers,
      exports: providers,
    };
  }

  static forRootAsync(options: SensModuleAsyncOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: AlimtalkClient,
        useFactory: async () => {
          const _options = await options.useFactory();
          return _options.alimtalk
            ? new AlimtalkClient({
                ..._options,
                ..._options.alimtalk,
              })
            : null;
        },
        inject: options.inject || [],
      },
      {
        provide: SmsClient,
        useFactory: async () => {
          const _options = await options.useFactory();
          return _options.sms
            ? new SmsClient({
                ..._options,
                ..._options.sms,
              })
            : null;
        },
        inject: options.inject || [],
      },
    ];

    return {
      global: true,
      module: SensModule,
      imports: options.imports,
      providers,
      exports: providers,
    };
  }
}
