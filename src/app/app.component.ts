import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { AuthService } from './service/auth.service';
import { OrderService } from './service/order.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [MatIconRegistry]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  constructor(
    private iconReg: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private orderService: OrderService
  ){
    [['youtube', 'youtube.svg'], ['twitter', 'twitter.svg'], ['login', 'login.svg'], ['register', 'register.svg'], ['add', 'plus.svg'], ['google', 'google-plus.svg'], ['facebook', 'facebook-logo.svg'], ['fax', 'fax.svg'], ['phone_in_talk', 'phone_in_talk.svg'], ['forward_mail', 'forward_mail.svg'], ['move_to_inbox', 'move_to_inbox.svg'], ['send', 'send.svg'], ['block_user', 'block_user.svg']]
    .forEach(([icon, filename]) => {
      this.iconReg.addSvgIcon(icon, this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/' + filename));
    });
    this.authService.checkLogin();
    this.orderService.loadOrder();
  }
  ngOnInit(){
  }
  ngOnDestroy(){

  }
}
