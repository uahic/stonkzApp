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

  showSearchBar(): void {
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
    const componentRef = overlayRef.attach(new ComponentPortal(FuzzySearchComponent));
    componentRef.instance.overlayRef = overlayRef;
    overlayRef.backdropClick().pipe(take(1)).subscribe(_ => overlayRef.dispose());

  }
}
