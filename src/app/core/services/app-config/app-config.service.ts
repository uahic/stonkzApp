import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig!: AppConfig;

  constructor() { }

  // Gets called by appInitializerFn in app.module.ts
  loadAppConfig(): void {
    // this.appConfig = ...
    // return a promise if async
    this.appConfig = {
      apis: {
        finnhub: {
          label: 'Finnhub',
          key: 'btc93k748v6on6gd4kbg'
        },
        finnhubsandbox: {
          label: 'Finnhub Sandbox',
          key: 'sandbox_c1575jn48v6plao69p40'
        },
        iexcloud: {
          label: 'IEXCloud',
          key: 'pk_2ecfc503afbf458a99003dd7f31aaf74'
        },
        alphavantage: {
          label: 'Alphavantage',
          key: 'XV4EXB0WATU36LG1'
        }
      }
    };
  }

  getConfig(): AppConfig {
    return this.appConfig;
  }
}
