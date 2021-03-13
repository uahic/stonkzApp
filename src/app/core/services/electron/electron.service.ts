import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { IpcRenderer, WebFrame, Remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: IpcRenderer;
  webFrame: WebFrame;
  remote: Remote;
  childProcess: childProcess.ChildProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    } else {
      console.error('Electron\'s IPC was not loaded');
    }
  }

  public openJson<T>(fileName: string): Observable<T> {
    return from(this.ipcRenderer.invoke('load-json', fileName));
  }

  public writeJson<T>(fileName: string, json: T): Observable<any> {
    return from(this.ipcRenderer.invoke('write-json', fileName, json));
  }
}
