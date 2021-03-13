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
        path: 'stocks',
        loadChildren: () => import('./modules/stocks/stocks.module').then(m => m.StocksModule)
      },
      {
        path: 'macro',
        loadChildren: () => import('./modules/macro/macro.module').then(m => m.MacroModule)
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
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
