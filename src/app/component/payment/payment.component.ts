import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from '../../service/order.service';
import { IOrder } from '../../interfaces/IEntity';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  userForm: FormGroup;
  error: string = '';
  constructor(
    private ref: MatDialogRef<PaymentComponent>,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private orderService: OrderService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      address: ['', Validators.required],
    });
  }
  onPlaceOrder() {
    const temp: IOrder = {
      name: this.userForm.controls['name'].value,
      phone: this.userForm.controls['phone'].value,
      email: this.userForm.controls['email'].value,
      address: this.userForm.controls['address'].value,
      details: this.data.order.details,
      payment: 0,
      status: 0,
    }
    this.matDialog.open(ConfirmDialog, {data: {info: temp, msg: 'Please check your information again before placing order.'}}).afterClosed().subscribe( data => {
      if(data == 1) {
        this.orderService.placeOrder(temp).subscribe(data=>{
          this.snackBar.open('Place Order', 'Success',{
            duration: 2000
          });
          this.orderService.removeAll()
          this.ref.close();
        },
        error => {
          this.error = error.statusText;
          console.log(error)
        })     
      }
    })
  }
  ngOnInit() {
  }

}
@Component({
  selector: 'confirm-dialog',
  templateUrl: '/confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(0);
  }
  onConfirm(): void {
    this.dialogRef.close(1);
  }

}
