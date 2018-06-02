import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IAlbum, IDetailsOrder } from '../../interfaces/IEntity';
import { CurrencyPipe } from '@angular/common';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {

  @Input() item : IAlbum;
  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }
  ngOnInit() {
  }
  navigateDetailComponent() {
    this.router.navigate(['/detail-item/', this.item.id]);
  }
  addToCart() {
    const detail: IDetailsOrder = {
      album: this.item,
      quantity: 1,
    }
    this.orderService.addCart(detail);
  }
}
