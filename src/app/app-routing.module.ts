import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/components';
import { DefaultNavigationComponent } from './layout/default-navigation/default-navigation.component';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';

// import { DetailRoutingModule } from './detail/detail-routing.module';

const routes: Routes = [
  {
    path: '',
    component: DefaultNavigationComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'macro',
        loadChildren: () => import('./modules/macro/macro.module').then(m => m.MacroModule)
      },
      {
        path: 'quotes',
        loadChildren: () => import('./modules/quote/quote.module').then(m => m.QuoteModule)
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
