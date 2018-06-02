import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IOrder, IDetailsOrder } from '../interfaces/IEntity'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators'
import { Constant } from '../utils/constant'
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Injectable()
export class OrderService {
  pageSubject = new BehaviorSubject<any>([]);
  orders: IOrder[];
  currentOrder: IOrder;
  myStorage = window.localStorage;
  public order: BehaviorSubject<any>;
  token: string;
  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private authService: AuthService
  ) { 
    this.order = new BehaviorSubject(null);
    this.order.subscribe(data => {
      this.currentOrder = data;
    })
    this.authService.userInfo.subscribe(data => {
      if(data)
      this.token = data.token;
      console.log(data)
    })
  }
  loadOrder() {
    let data = this.myStorage.getItem('order');
    if (data) {
      console.log('load: ')
      console.log(data)
      this.order.next(JSON.parse(data));
    }
  }
  addCart(detail : IDetailsOrder) {
    console.log(this.currentOrder)
    if(this.currentOrder === null) {
      const order1: IOrder = {
        details: [detail]
      }
      this.order.next(order1);
      this.myStorage.setItem('order', JSON.stringify(order1));
    }else{
      console.log(detail)
      if(!this.currentOrder.details.find(x => x.album.id === detail.album.id)){
        console.log('push')
        this.currentOrder.details.push(detail)
        this.order.next(this.currentOrder);
        this.myStorage.setItem('order', JSON.stringify(this.currentOrder));
      }else{
        this.snackBar.open('Album existed in cart', 'Conflict',{
          duration: 2000
        });
      }
    }
  }
  removeDetail(detail : IDetailsOrder) {
    const tempOrder = this.currentOrder.details.filter( x => x.album.id !== detail.album.id)
    this.order.next(tempOrder);
    this.myStorage.setItem('order', JSON.stringify(tempOrder));
  }
  removeAll() {
    this.order.next(null);
    this.myStorage.removeItem('order')
  }
}
