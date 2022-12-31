import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../models/customer.model';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  customer: Customer;
  msg: string;


  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      customerName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
     
      phone: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9@%_]+$/)]),
      repassword: new FormControl('', [Validators.required]),
     
      address: new FormControl('', [Validators.required]),
    });
  }

  onSignUp(){
    this.customer = {
      name: this.signUpForm.value.customerName,
      phone: this.signUpForm.value.phone,
      address: this.signUpForm.value.address,
      user: {
        username: this.signUpForm.value.username,
        password: this.signUpForm.value.password
      }
    
    };
    /* password is == repassword */
    let repassword = this.signUpForm.value.repassword;
    if(! (this.signUpForm.value.password == repassword) ){
      this.msg = 'Passwords do not match';
    }
    else{
      this.loginService.signup(this.customer).subscribe({
        next: (data)=>{
          //naviagate the User to Login
          this.loginService.msg$.next('SignUp Success!!')
          this.router.navigateByUrl('/login/0');
        },
        error: (err)=>{
          //display error message
        }
      });
    }
  }

}
