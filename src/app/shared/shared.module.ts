import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CdkTableModule} from '@angular/cdk/table';
import { RouterModule, Routes } from '@angular/router';
import { TabFilterComponent } from './tab-filter/tab-filter.component';
import { NavComponent } from './nav/nav.component';
import { ScrollHeaderDirective } from './directives/scroll-header.directive';
import { CarouselComponent } from './carousel/carousel.component';
import { DateCreatedPipe } from './pipes/date-created.pipe';
import { PriceFilterPipe } from './pipes/price-filter.pipe';
import { AreaFilterPipe } from './pipes/area-filter.pipe';
import { MoneyPipe } from './pipes/money.pipe';
import { DirectionPipe } from './pipes/direction.pipe';
import { TypePipe } from './pipes/type.pipe';
import { AlbumCardComponent } from './album-card/album-card.component';
@NgModule({
  declarations: [
    TabFilterComponent,
    NavComponent,
    ScrollHeaderDirective,
    CarouselComponent,
    DateCreatedPipe,
    PriceFilterPipe,
    AreaFilterPipe,
    MoneyPipe,
    DirectionPipe,
    TypePipe,
    AlbumCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  exports:[
    CommonModule,
    TabFilterComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    CarouselComponent,
    NavComponent,
    PriceFilterPipe,
    AreaFilterPipe,
    MoneyPipe,
    DateCreatedPipe,
    DirectionPipe,
    TypePipe,
    AlbumCardComponent
  ]
})
export class SharedModule { }
