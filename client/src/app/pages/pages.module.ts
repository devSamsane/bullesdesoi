import { NgModule } from '@angular/core';

import { AboutMeComponent } from './about-me/about-me.component';
import { EnfanceComponent } from './applications/enfance/enfance.component';
import { AdolescenceComponent } from './applications/adolescence/adolescence.component';
import { AdulteComponent } from './applications/adulte/adulte.component';
import { SeniorComponent } from './applications/senior/senior.component';
import { DeontologieComponent } from './deontologie/deontologie.component';
import { HomeComponent } from '../home/home.component';
import { DescriptionSeancesComponent } from './description-seances/description-seances.component';
import { TarificationComponent } from './tarification/tarification.component';

@NgModule({
  declarations: [
    AboutMeComponent,
    EnfanceComponent,
    AdolescenceComponent,
    AdulteComponent,
    SeniorComponent,
    DeontologieComponent,
    HomeComponent,
    DescriptionSeancesComponent,
    TarificationComponent
  ]
})
export class PagesModule {}
