import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './component/main-component.module'
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
@NgModule({
  declarations: [
    AppComponent
    //LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    StoreModule.forRoot(reducers),
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
