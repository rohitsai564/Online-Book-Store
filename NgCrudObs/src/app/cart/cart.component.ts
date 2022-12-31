import { Customer } from './../models/customer.model';
import { CustomerService } from './../services/customer.service';
import { DatePipe, formatDate } from '@angular/common';
import { Orders } from './../models/orders.model';
import { BooksService } from './../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from './../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Books } from '../models/books.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  id = 0;
  val = 0;
  qty = 1;

  book: Books =
    {
      bookId: 1,
      title: 'Test Title',
      author: 'Unknown',
      category: 'test',
      price: 23.00,
      no_copies: 10,
      availability: true,
      imgBytes:''
    };

    customer: Customer = {
      customerid: 0,
      name:'doe',
      address: '',
      phone: '',
      wallet: 0.0
    }

  order: Orders = new Orders();

  orders: Orders[] = [];

  datePipe!: DatePipe;

  constructor(private orderService: OrdersService, private route: ActivatedRoute,
    private router: Router, private bookService: BooksService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.val = this.route.snapshot.params['val'];
    this.loadData();
  }

  goHome() {
    if(this.val == 0) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/cDash', this.val]);
    }
  }

  loadData() {
    this.bookService.getBookById(this.id)
    .subscribe(data => {
      console.log(data);
      this.book = data;
    }, error => console.log(error));


  }

  placeOrder() {
    if (this.book.availability == false) {
      alert("Sorry this book is currently out of stock.");
      this.router.navigate(['/cDash', this.val]);
    } else {
      if (this.val == 0) {
        alert('Please Login or Register to Continue');
        this.router.navigate(['/login', this.val]);
      } else {
        this.order.orderId = 0;
        let today = new Date();
        this.order.orderDate = today;
        let delDate = this.addDays(new Date(), 5);
        this.order.deliveryDate = delDate;
        this.order.amount = (this.book.price * this.qty) - (this.book.price * this.qty * 0.1);
        this.order.customerId = this.val;
        this.order.bookId = this.id;
        this.order.orderStatus = 0;
        this.order.quantity = this.qty;
        // console.log(today);
        // console.log(delDate);

        if (this.qty < this.book.no_copies) {
          this.orderService.uploadNewOrderDetails(this.order)
          .subscribe(ele => {
            console.log(ele);

            if (ele != null) {
              alert("Order placed successfully");
              this.book.no_copies -= this.qty;
              this.bookService.updateNumberOfCopies(this.book)
              .subscribe(info => {
                console.log(info);
                alert(info);
              }, error => console.log(error));

              this.customerService.getCustomerDetailsById(this.val)
              .subscribe(cus => {
                console.log(cus);
                this.customer = cus;
                this.customer.wallet -= this.order.amount;
              //  this.customer.coupon = coup;

                this.customerService.updateWallet(this.customer)
                .subscribe(con => {
                  console.log(con);
                  alert(con);

                  this.previousOrders();

                  
                })



                if (this.book.no_copies == 0) {
                  this.book.availability = false;

                  this.bookService.updateAvailability(this.book)
                  .subscribe(r => {
                    console.log(r);
                    alert(r);
                  })
                }
              })
              this.router.navigate(['/cDash', this.val]);
            } else {
              alert ("Unable to place order");
            }
          }, error => console.log(error));
        } else {
          alert('Quantity not availble. Re-order with lesser number of copies')
        }
      }
    }
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  logout() {
    this.id = 0;
    this.router.navigate(['/home']);
  }

  showProfileDetails() {
    this.router.navigate(['/cDetails', this.val]);
  }

  previousOrders(){
    this.orderService.listAllCustomerOrders(this.val)
    .subscribe(data => {
      console.log(data);
      this.orders = data;
    })
  }
}
