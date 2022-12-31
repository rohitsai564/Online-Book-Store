import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { CustomDatePipe } from './custom.datepipe';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CustomerdashComponent } from './customerdash/customerdash.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';

import { AddbookComponent } from './addbook/addbook.component';

import { EditbookComponent } from './editbook/editbook.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomerdashComponent,
    AdmindashComponent,
    BookdetailsComponent,
    CustomDatePipe,
    CustomerdetailsComponent,
    InlineEditComponent,
    CartComponent,
    OrdersComponent,
    
    AddbookComponent,
    EditbookComponent,
    OrderdetailsComponent,
    AdminLoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
