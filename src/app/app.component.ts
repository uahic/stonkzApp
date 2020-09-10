import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ElectronService } from './core/services';
import { Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HotkeysService } from '@ngneat/hotkeys';


@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sub: Subscription;
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private hotkeys: HotkeysService
  ) {
    this.translate.setDefaultLang('en');

    if (electronService.isElectron) {
      console.log(process.env);
      // console.log('Run in electron');
      // console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      // console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      // console.log('Run in browser');
    }

    this.hotkeys.addShortcut({ keys: 'meta.p' })
      .pipe(untilDestroyed(this))
      .subscribe(e => console.log('hotkey !'));
  }
}
