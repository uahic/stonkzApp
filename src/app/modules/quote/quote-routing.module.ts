import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteDetailComponent } from './pages/quote-detail/quote-detail.component';
import { QuoteMasterComponent } from './pages/quote-master/quote-master.component';

const routes: Routes = [
  {
    path: '',
    component: QuoteMasterComponent,
    children: [
      {
        path: 'detail/:symbol',
        component: QuoteDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
