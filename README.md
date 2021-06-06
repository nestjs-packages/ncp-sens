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

## Description

Base on [@pickk/sens](https://github.com/DEV-MUGLES/sens)<br>

## Features

- [x] send SMS
- [x] send Alimtalk

## Installation

```bash
$ npm i --save nest-inicis
# or
$ yarn add nest-sens
```

## Quick Start

Once the installation process is complete, we can import the `SensModule` into the root `AppModule`.

```typescript
import { Module } from '@nestjs/common';
import { SensModule } from 'nest-sens';

@Module({
  imports: [
    SensModule.forRoot({
      accessKey: 'ACCESS_KEY',
      secretKey: 'SECRET_KEY',
      smsServiceId: 'SMS_SERVICE_ID',
      smsSecretKey: 'SMS_SECRET_KEY',
      callingNumber: '01012341234',
      alimtalkServiceId: 'ALIMTALK_SERVICE_ID',
      plusFriendId: 'PLUS_FRIEND_ID',
    }),
  ],
})
export class AppModule {}
```

## Author

- [Sumin Choi](https://sumini.dev)

## License

Nest-Sens is [MIT licensed](https://github.com/greatSumini/nest-inicis/blob/master/LICENSE).
