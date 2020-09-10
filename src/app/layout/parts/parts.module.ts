import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { TabsNavComponent } from './tabs-nav/tabs-nav.component';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [TabsNavComponent, FooterComponent, TopBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    TabsNavComponent,
    FooterComponent,
    TopBarComponent
  ]
})
export class PartsModule { }
