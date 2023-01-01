
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';
import { LoginServiceService } from '../services/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg: string;
  loginForm: FormGroup;
  user :User;  
  val: any;
  customer: Customer;

  constructor( private loginService: LoginServiceService, private router: Router,
    private route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.val = this.route.snapshot.params['id'];
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });

    this.loginService.msg$.subscribe({
      next: (data)=>{
        this.msg = data;
      }
    });

  }

  // login(): void {
  //   if(this.username.includes('pageage')) {
  //     this.employeeService.getEmployeeByEmail(this.username)
  //       .subscribe(data => {
  //         console.log(data);
  //         this.employee = data;
  //         if (this.employee.passcode == this.pass) {
  //           console.log(this.pass);
  //           let id = this.employee.employeeId;
  //           this.router.navigate(['/adminDash', id]);
  //         } else {
  //           alert("Username or Password wrong!");
  //         }
  //       }, error => console.log(error));
  //   } else {
  //     this.customerService.getCustomerByEmail(this.username)
  //       .subscribe(data => {
  //         console.log(data);
  //         this.customer = data;
  //         if (this.customer.passcode == this.pass) {
  //           console.log(this.pass);
  //           let id = this.customer.customerId;
  //           if (this.val == 0) {
  //             this.router.navigate(['/cDash', id]);
  //           } else {
  //             this.router.navigate(['/cart', this.val, id]);
  //           }

  //         } else {
  //           alert("Username or Password wrong!");
  //         }
  //       }, error => console.log(error));
  //   }
  // }

  // registerCustomer() {
  //   if (this.confirm == this.customer.passcode) {
  //     this.customer.wallet = 25000.00;
  //     this.customerService.uploadCustomerDetails(this.customer)
  //     .subscribe(data => {
  //       console.log(data);
  //       if (data != null) {
  //         alert("Registration Successful");
  //         window.location.reload();
  //       }
  //     }, error => console.log(error))
  //   } else {
  //     alert("Please re - enter the data");
  //   }
  // }

  // goHome() {
  //   this.router.navigate(['/home']);
  // }

  onLogin(){
    //Call Login API
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let token = window.btoa(username + ':' + password);
    this.loginService.login(token).subscribe({
      next: (data)=>{
         this.user = data;
         /*
          Save user details for login check
          1. Cache Memory
          2. Subjects
         */

         //Cache Memory
         
         localStorage.setItem("username",this.user.username);
         localStorage.setItem("role", this.user.role);
         localStorage.setItem("token", token);
         //Subject
        this.loginService.user$.next(this.user);
        let id = this.user.id;
         /* Check the role */
         if(this.user.id == 82){
            this.router.navigate(['/adminDash', id]);
         }
         else
         
         if (this.val == 0) {
           this.router.navigate(['/cDash', id]);
         } else {
           this.router.navigate(['/cart', this.val, id]);
         }
        //  if(this.user.role == 'CUSTOMER'){
        //     this.router.navigateByUrl('/cDash', this.user.id);
        //  }
      },
      error: (err)=>{
         this.msg = 'Invalid Credentials';
      }
    });
  }


}
