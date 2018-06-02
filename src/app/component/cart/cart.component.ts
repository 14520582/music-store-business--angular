import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { IOrder } from '../../interfaces/IEntity';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  order: IOrder
  constructor(
    private orderService: OrderService
  ) { 
    this.orderService.order.subscribe( data => {
      this.order = data
    })
  }
  removeAll() {
    this.orderService.removeAll()
  }
  ngOnInit() {
  }
  getSum() {
    let sum = 0;
    this.order.details.map( detail => {
      sum += detail.album.price * detail.quantity
    })
    return sum;
  }
  editQt ( type : number, id: number) {
    if(type == 1) {
      this.order.details.map( x => {
        if(x.album.id === id)
          x.quantity += 1;
      })
    }else {
      this.order.details.map( x => {
        if(x.album.id === id && x.quantity > 1)
        x.quantity -= 1;
      })
    }
  }
  
}
