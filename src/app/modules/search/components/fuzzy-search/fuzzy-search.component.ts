import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchResult } from '../../search-result.model';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { SearchEngineService, SearchFilter, SearchType } from '../../search-engine.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.scss']
})
export class FuzzySearchComponent implements OnInit, AfterViewInit {

  @ViewChild('input') searchInputField: ElementRef;
  constructor(private searchEngine: SearchEngineService) { }

  public autoComplete$: Observable<Record<string, SearchResult[]>> = null;
  public autoCompleteControl = new FormControl();
  public overlayRef: OverlayRef;

  ngOnInit(): void {
    this.autoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      debounceTime(400),
      filter(value => !!value),
      map<string, string>(value => value.trim()),
      filter(value => value !== ''),
      switchMap(value => {
        return this.lookup(value).pipe(
          map(results => this.groupByType(results))
        );
      })
    );
  }

  ngAfterViewInit(): void {
    // this.searchInputField.nativeElement.focus();
  }

  openSelection(selection: SearchResult): void {
    selection.command();
    this.overlayRef.dispose();
  }

  lookup(query: string): Observable<SearchResult[]> {
    let filter: SearchFilter = [];
    if (query.startsWith('>')) {
      filter = [SearchType.COMMANDS];
    }
    return this.searchEngine.search(query, filter);
  }

  _groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K): Record<K, T[]> {
    return list.reduce((previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    }, {} as Record<K, T[]>);
  }

  groupByType(results: SearchResult[]): Record<string, SearchResult[]> {
    const grouped = this._groupBy(results, res => res.type);
    return grouped;
  }

}
