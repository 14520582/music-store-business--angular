import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { IOrder, IDetailsOrder } from '../../interfaces/IEntity';
import { CurrencyPipe } from '@angular/common';
import { PaymentComponent } from '../payment/payment.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  order: IOrder
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private matDialog : MatDialog,
  ) { 
    this.orderService.order.subscribe( data => {
      this.order = data
    })
  }
  removeAll() {
    this.orderService.removeAll()
  }
  removeLineItem( idAlbum : number ) {
    this.orderService.removeDetail(idAlbum);
  }
  ngOnInit() {
  }
  placeOrder() {
    if(this.authService.logged)
      this.matDialog.open(PaymentComponent, {data: {order: this.order}})
    else {
      this.matDialog.open(LoginRequestDialog).afterClosed().subscribe( type => {
        if(type === 2)
          this.matDialog.open(LoginComponent)
        else
          this.matDialog.open(PaymentComponent, {data: {order: this.order}})
      })
    }
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
@Component({
  selector: 'login-request-dialog',
  templateUrl: '/login-request-dialog.component.html',
  styleUrls: ['./login-request-dialog.component.scss']
})
export class LoginRequestDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(0);
  }
  onConfirm(): void {
    this.dialogRef.close(2);
  }

}
