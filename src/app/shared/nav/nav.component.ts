import { Component, OnInit, HostListener } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../component/login/login.component';
import { OrderService } from '../../service/order.service';
import { IGenre } from '../../interfaces/IEntity';
import { AlbumService } from '../../service/album.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userInfo: any;
  genres: IGenre[]
  order: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private albumService: AlbumService,
    private orderService: OrderService,
    private loginDialog: MatDialog
  ) { 
    this.authService.userInfo.subscribe(data => {
      this.userInfo = data;
      console.log(data)
    })
    this.albumService.getAllGenres().subscribe( data => {
      this.genres = data;
    })
    this.orderService.order.subscribe(data => {
      this.order = data;
      console.log(data)
    })
  }


  ngOnInit() {
  }
  openLoginScreen(){
    this.loginDialog.open(LoginComponent)

  }
  toCart() {
    this.router.navigate(['/cart'])
  }
  logout(){
    this.authService.logout()
  }
}
