import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AlimtalkClient, SmsClient } from '@pickk/sens';

import { SensModuleOptions, SensModuleAsyncOptions } from './interfaces';

@Module({})
export class SensModule {
  static forRoot(options: SensModuleOptions): DynamicModule {
    const providers: Provider[] = [];
    if ('sms' in options) {
      providers.push({
        provide: SmsClient,
        useValue: new SmsClient({
          ...options,
          ...options.sms,
        }),
      });
    }
    if ('alimtalk' in options) {
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
        useFactory: async (...args) => {
          const _options = await options.useFactory(...args);
          return 'alimtalk' in _options
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
        useFactory: async (...args) => {
          const _options = await options.useFactory(...args);
          return 'sms' in _options
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
