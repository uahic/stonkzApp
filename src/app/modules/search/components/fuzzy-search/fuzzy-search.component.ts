import { AfterViewInit, Component, ElementRef, KeyValueDiffers, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchGroupResult } from '../../search-result.model';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { SearchEngineService, SearchFilter } from '../../search-engine.service';

@Component({
  selector: 'app-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.scss']
})
export class FuzzySearchComponent implements OnInit, AfterViewInit {

  @ViewChild('input') searchInputField: ElementRef;
  constructor(private searchEngine: SearchEngineService) { }

  public autoComplete$: Observable<SearchGroupResult[]> = null;
  public autoCompleteControl = new FormControl();

  ngOnInit(): void {
    this.autoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      debounceTime(600),
      map<string, string>(value => value.trim()),
      filter(value => value !== ''),
      switchMap(value => {
        return this.lookup(value);
      })
    );
  }

  ngAfterViewInit(): void {
    // this.searchInputField.nativeElement.focus();
  }

  lookup(query: string): Observable<SearchGroupResult[]> {
    let filter: SearchFilter = SearchFilter.ALL;
    if (query.startsWith('>')) {
      filter = SearchFilter.COMMANDS;
    }
    return this.searchEngine.search(query, filter);
  }

}
