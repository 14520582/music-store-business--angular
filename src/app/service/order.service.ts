import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IOrder, IDetailsOrder, IUser } from '../interfaces/IEntity'
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
  userInfo: IUser;
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
      if(data){
        this.token = data.token;
        this.userInfo = data;
        console.log(data)
      }
    })
  }
  loadOrder() {
    let data: any = this.myStorage.getItem('order');
    if (data) {
      const temp: any = JSON.parse(data)
      if(temp.details) {
        console.log('load: ')
        console.log(temp)
        this.order.next(temp);
      }
    }
  }
  placeOrder(order: IOrder): Observable<IOrder> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    const body: IOrder = {
      ...order,
      date: new Date().getTime(),
      customer: {
        id: this.authService.logged ? this.userInfo.id : 0
      }
    }
    console.log(body)
    return this.http.post<IOrder>(Constant.SERVER + 'orders/client/add', body, httpOptions)
  }
  getOrder(): Observable<IOrder[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Token': this.token
      })
    };
    return this.http.get<IOrder[]>(Constant.SERVER + 'orders/client/'+ this.userInfo.id, httpOptions)
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
  removeDetail(idAlbum : number) {
    const newDetails = this.currentOrder.details.filter( x => x.album.id !== idAlbum)
    if(newDetails.length < 1) {
      this.order.next(null);
      this.myStorage.removeItem('order')
    }else{
      const newOrder = {
        ...this.currentOrder,
        details: newDetails
      }
      this.order.next(newOrder);
      this.myStorage.setItem('order', JSON.stringify(newOrder));
    }
  }
  removeAll() {
    this.order.next(null);
    this.myStorage.removeItem('order')
  }
}
