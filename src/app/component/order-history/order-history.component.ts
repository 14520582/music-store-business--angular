import { Component, OnInit } from '@angular/core';
import { IDetailsOrder, IOrder } from '../../interfaces/IEntity';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: IOrder[]
  constructor(
    private orderService: OrderService
  ) {
    this.orderService.getOrder().subscribe(data => {
      this.orders = data.sort((a, b) => b.date - a.date);
    })
  }
  getStatus(value: number) {
    if (value === 0)
      return 'New'
    if (value === 1)
      return 'Accepted and Delivering'
    if (value === 2)
      return 'Done'
  }
  ngOnInit() {
  }
  getColor(status) {
    switch (status) {
      case 0:
        return 'green';
      case 1:
        return 'blue';
      case 2:
        return 'red';
    }
  }
  getSum(list: IDetailsOrder[]) {
    let sum: number = 0;
    list.map(item => {
      sum += item.quantity * item.album.price
    })
    return sum;
  }
}
