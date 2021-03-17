import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResult } from './search-result.model';

export enum SearchType {
  STOCKS,
  COMMANDS,
  COMMODITIES,
  CRYPTO
}

export type SearchFilter = SearchType[];

export type SearchCallback = (query: string, filter: SearchFilter) => Observable<SearchResult[]>;

@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {

  private providers = new Map<string, SearchCallback>();

  constructor() { }

  search(query: string, filter: SearchFilter): Observable<SearchResult[]> {
    const callbacks: Observable<SearchResult[]>[] = [];
    this.providers.forEach(callback => {
      callbacks.push(callback(query, filter));
    });
    return forkJoin(callbacks).pipe(
      map(results => [].concat(...results))
    );
  }

  registerSource(id: string, queryCallback: SearchCallback): void {
    this.providers.set(id, queryCallback);
  }

  unregisterSource(id: string): void {
    this.providers.delete(id);
  }
}
