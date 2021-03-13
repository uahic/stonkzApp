import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { SearchGroupResult } from './search-result.model';

export enum SearchFilter {
  ALL,
  STOCKS,
  COMMANDS,
  COMMODITIES,
  CRYPTO
}

export type SearchCallback = (query: string, filter: SearchFilter) => Observable<SearchGroupResult>;

@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {

  private providers = new Map<string, SearchCallback>();

  constructor() { }

  search(query: string, filter: SearchFilter): Observable<SearchGroupResult[]> {
    const callbacks: Observable<SearchGroupResult>[] = [];
    this.providers.forEach(callback => {
      callbacks.push(callback(query, filter));
    });
    return forkJoin(callbacks);
  }

  registerSource(id: string, queryCallback: SearchCallback): void {
    this.providers.set(id, queryCallback);
  }

  unregisterSource(id: string): void {
    this.providers.delete(id);
  }
}
