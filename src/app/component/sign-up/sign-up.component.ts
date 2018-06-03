import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { IUser } from '../../interfaces/IEntity';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;
  error: string = '';
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: [''],
      email: ['', Validators.email],
      address: [''],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });
  }
  onSignUp() {
    if(this.checkNewPassword()) {
      const user: IUser = {
        name: this.userForm.controls['name'].value,
        username: this.userForm.controls['username'].value,
        phone: this.userForm.controls['phone'].value,
        address: this.userForm.controls['address'].value,
        password: this.userForm.controls['password'].value,
        email: this.userForm.controls['email'].value
      }
      this.userService.register(user).subscribe(data => {
        console.log(data)
        this.dialogRef.close()
      },
      error => {
        this.error = error.statusText;
      })
    }
  }
  checkNewPassword() {
    if (this.userForm.controls['password'].value === this.userForm.controls['confirm'].value)
      return true;
    return false
  }
  ngOnInit() {
  }

}
