import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AuthService } from '../service/auth.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OrderService } from '../service/order.service';
import { AlbumService } from '../service/album.service';
import { UserService } from '../service/user.service';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { DetailAlbumComponent } from './detail-album/detail-album.component';
import { CartComponent, LoginRequestDialog } from './cart/cart.component';
import { PaymentComponent, ConfirmDialog } from './payment/payment.component';
import { AddressComponent } from './address/address.component';
import { ProfileComponent } from './profile/profile.component';
import { SectionComponent } from './section/section.component';
@NgModule({
  declarations: [
      HomeComponent, 
      LoginComponent,
      LayoutComponent,
      FooterComponent,
      AboutComponent,
      ContactComponent,
      LoginRequestDialog,
      SignUpComponent,
      ConfirmDialog,
      OrderHistoryComponent,
      DetailAlbumComponent,
      CartComponent,
      PaymentComponent,
      AddressComponent,
      ProfileComponent,
      SectionComponent
  ],
  entryComponents: [SignUpComponent, PaymentComponent, ConfirmDialog, LoginRequestDialog],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    HomeComponent,
    LoginComponent,
    LayoutComponent,
    FooterComponent,
    ConfirmDialog,
    LoginRequestDialog,
    SignUpComponent,
    OrderHistoryComponent,
    DetailAlbumComponent,
    CartComponent,
    ProfileComponent,
    SectionComponent
  ],
  providers: [AuthService, OrderService, AlbumService, UserService],
})
export class MainModule { }