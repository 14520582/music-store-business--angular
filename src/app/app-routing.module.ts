import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { DetailAlbumComponent } from './component/detail-album/detail-album.component';
import { CartComponent } from './component/cart/cart.component'
import { ProfileComponent } from './component/profile/profile.component'
import { SectionComponent } from './component/section/section.component'
import { OrderHistoryComponent } from './component/order-history/order-history.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'history', component: OrderHistoryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'section', component: SectionComponent },
  { path: 'detail-album', component: DetailAlbumComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
