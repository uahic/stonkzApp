import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FuzzySearchComponent } from './components/fuzzy-search/fuzzy-search.component';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchOverlayService {

  private overlayRef: OverlayRef | undefined;

  constructor(private overlay: Overlay) { }

  showSearchBar() {
    if (!!this.overlayRef && this.overlayRef.hasAttached()) {
      return;
    }

    const positionStrategy: PositionStrategy = this.overlay.position().global().centerHorizontally().top('24px');

    const config: OverlayConfig = {
      positionStrategy: positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      hasBackdrop: true,
      disposeOnNavigation: true,
    };
    const overlayRef = this.overlay.create(config);
    overlayRef.attach(new ComponentPortal(FuzzySearchComponent));
    overlayRef.backdropClick().pipe(take(1)).subscribe(_ => overlayRef.dispose());

  }
}
