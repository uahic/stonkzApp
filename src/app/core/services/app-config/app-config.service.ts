import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: AppConfig;

  constructor() { }

  // Gets called by appInitializerFn in app.module.ts
  loadAppConfig(): void {
    // this.appConfig = ...
    // return a promise if async
    this.appConfig = {
      // stockAPI: 'Finnhub',
      // stockAPIKey: 'btc93k748v6on6gd4kbg'
      stockAPI: 'Alphavantage',
      stockAPIKey: 'XV4EXB0WATU36LG1'
    };
  }

  getConfig(): AppConfig {
    return this.appConfig;
  }
}
