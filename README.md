<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">NCP SENS Client module for <a href="http://nestjs.com/" target="_blank">Nest.js</a></p>
    <p align="center">
<a href="https://www.npmjs.com/package/@nestjs-packages/ncp-sens" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs-packages/ncp-sens.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@nestjs-packages/ncp-sens" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs-packages/ncp-sens.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@nestjs-packages/ncp-sens" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs-packages/ncp-sens.svg" alt="NPM Downloads" /></a>
<a href="https://coveralls.io/github/nestjs-packages/ncp-sens?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs-packages/ncp-sens/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://github.com/nestjs-packages/ncp-sens" target="_blank"><img src="https://img.shields.io/github/stars/nestjs-packages/ncp-sens?style=social"></a>
</p>

Base on [@pickk/sens](https://github.com/DEV-MUGLES/sens)<br>

## 1. Features

- [x] send SMS
- [x] send Alimtalk

## 2. Installation

```bash
$ npm i --save @nestjs-packages/ncp-sens
# or
$ yarn add @nestjs-packages/ncp-sens
```

## 3. Usage

### 1. configure

sync

```typescript
import { SensModule } from '@nestjs-packages/ncp-sens';

@Module({
  imports: [
    SensModule.forRoot({
      accessKey: 'ACCESS_KEY',
      secretKey: 'SECRET_KEY',
      sms: {
        smsServiceId: 'SMS_SERVICE_ID',
        smsSecretKey: 'SMS_SECRET_KEY',
        callingNumber: '01012341234',
      },
      alimtalk: {
        alimtalkServiceId: 'ALIMTALK_SERVICE_ID',
        plusFriendId: 'PLUS_FRIEND_ID',
      }
    }),
  ],
})
```

async

```typescript
import {
  SensModule,
  SensModuleAsyncOptions,
  SensModuleOptions,
} from '@nestjs-packages/ncp-sens';

import { SensConfigModule, SensConfigService } from 'your-config-path';

@Module({
  imports: [
    SensModule.forRootAsync({
      imports: [SensConfigModule],
      useFactory: async (sensConfigService: SensConfigService) =>
        ({
          accessKey: sensConfigService.ncloudAccessKey,
          secretKey: sensConfigService.ncloudSecretKey,
          sms: {
            smsServiceId: sensConfigService.ncloudSmsServiceId,
            smsSecretKey: sensConfigService.ncloudSmsSecretKey,
            callingNumber: sensConfigService.ncloudSmsCallingNumber,
          },
          alimtalk: {
            alimtalkServiceId: sensConfigService.ncloudAlimtalkServiceId,
            plusFriendId: sensConfigService.plusFriendId,
          },
        } as SensModuleOptions),
      inject: [SensConfigService],
    } as SensModuleAsyncOptions),
  ],
})
```

### 2. inject & send

```typescript
import { AlimtalkClient, SmsClient } from '@nestjs-packages/ncp-sens';

@Injectable()
export class YourService {
  constructor(
    @Inject(AlimtalkClient) private readonly alimtalkClient: AlimtalkClient,
    @Inject(SmsClient) private readonly smsClient: SmsClient
  ) {}

  async sendAlimtalk(templateCode: string, to: string, content: string) {
    await this.alimtalkClient.send({
      templateCode,
      messages: [{ to, content }],
    });
  }

  async sendSms(to: string, content: string) {
    await this.smsClient.send({ to, content });
  }
}
```

## Author

- [Sumin Choi](https://sumini.dev)

## License

@nestjs-packages/ncp-sens is [MIT licensed](https://github.com/nestjs-packages/ncp-sens/blob/master/LICENSE).
