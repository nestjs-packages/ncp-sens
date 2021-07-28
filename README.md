<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">NCP SENS Client component for <a href="http://nestjs.com/" target="_blank">Nest.js</a></p>
    <p align="center">
<a href="https://www.npmjs.com/package/nest-sens" target="_blank"><img src="https://img.shields.io/npm/v/nest-sens.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nest-sens" target="_blank"><img src="https://img.shields.io/npm/l/nest-sens.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/nest-sens" target="_blank"><img src="https://img.shields.io/npm/dm/nest-sens.svg" alt="NPM Downloads" /></a>
<a href="https://coveralls.io/github/DEV-MUGLES/nest-sens?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/DEV-MUGLES/nest-sens/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://github.com/DEV-MUGLES/nest-sens" target="_blank"><img src="https://img.shields.io/github/stars/DEV-MUGLES/nest-sens?style=social"></a>
</p>

Base on [@pickk/sens](https://github.com/DEV-MUGLES/sens)<br>

## 1. Features

- [x] send SMS
- [x] send Alimtalk

## 2. Installation

```bash
$ npm i --save nest-inicis
# or
$ yarn add nest-sens
```

## 3. Usage

### 1. configure

sync

```typescript
import { SensModule } from 'nest-sens';

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
} from 'nest-sens';

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
import { AlimtalkClient, SmsClient } from 'nest-sens';

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

Nest-Sens is [MIT licensed](https://github.com/greatSumini/nest-inicis/blob/master/LICENSE).
