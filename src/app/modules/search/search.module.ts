import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuzzySearchComponent } from './components/fuzzy-search/fuzzy-search.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule} from '@angular/cdk/a11y';



@NgModule({
  declarations: [FuzzySearchComponent],
  exports: [FuzzySearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    OverlayModule,
    A11yModule
  ],
})
export class SearchModule { }
