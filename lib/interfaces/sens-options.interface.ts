import { ModuleMetadata } from '@nestjs/common';
import { AlimtalkOptions, SensOptions, SmsOptions } from '@pickk/sens';

export type SensModuleOptions = SensOptions & {
  sms?: Omit<SmsOptions, keyof SensOptions>;
  alimtalk?: Omit<AlimtalkOptions, keyof SensOptions>;
};

export interface SensModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<SensModuleOptions> | SensModuleOptions;
  inject?: any[];
}
