import { ModuleMetadata } from '@nestjs/common';
import {} from '@pickk/sens';
import {
  AlimtalkOptions,
  SensOptions,
  SmsOptions,
} from '@pickk/sens/dist/interfaces';

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
