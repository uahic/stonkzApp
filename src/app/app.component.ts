import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ElectronService } from './core/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HotkeysService } from '@ngneat/hotkeys';
import { SearchOverlayService } from './modules/search/search-overlay.service';
import { DataProviderService } from './modules/dataprovider/data-provider.service'


@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private hotkeys: HotkeysService,
    private searchOverlay: SearchOverlayService,
    // Do not remove
    private dataprovider: DataProviderService
  ) {
    this.translate.setDefaultLang('en');

    if (electronService.isElectron) {
      console.log(process.env);
    } else {
      // console.log('Run in browser');
    }

    // TODO outsource the register-business

    // Shortcuts
    this.hotkeys.addShortcut({ keys: 'meta.p' })
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.searchOverlay.showSearchBar();
      });

  }
}
