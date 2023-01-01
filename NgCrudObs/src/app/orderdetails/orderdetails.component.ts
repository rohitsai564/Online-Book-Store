import { Customer } from './../models/customer.model';
import { CustomerService } from './../services/customer.service';
import { Books } from './../models/books.model';
import { Orders } from './../models/orders.model';
import { OrdersService } from './../services/orders.service';
import { BooksService } from './../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  id = 0;
  val = 0;

  order: Orders = new Orders();
  book: Books = new Books();
  customer: Customer = new Customer();

  isVisible = true;
  isEnabled = false;

  curDate = new Date();
  // status = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private bookService: BooksService, private orderService: OrdersService,
    private customerService:CustomerService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.val = this.route.snapshot.params['val'];
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    if (this.val > 100 && this.val < 201) {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
    this.orderService.showOrderDetails(this.id)
    .subscribe(data => {
      console.log(data);
      this.order = data;

      // if(this.order.orderDate == curDate) {
      //   this.isEnabled = false;
      // }
      // if(this.order.orderStatus !== "PENDING") {
      //   console.log(this.order.orderStatus)
      //   this.isEnabled = true;
      // }

      this.bookService.getBookById(this.order.bookId)
      .subscribe(info => {
        console.log(info);
        this.book = info;
      }, error => console.log(error));
    }, error => console.log(error));
  }

  goHome() {
    if(this.val == 82) {
      this.router.navigate(['/adminDash', this.val]);
    }

    if(this.val!=82) {
      this.router.navigate(['/cDash', this.val]);
    }
  }

  goToOrders() {
    this.router.navigate(['/orders', this.val]);
  }

  cancelOrder() {
    this.order.orderStatus = 1;
    this.orderService.updateOrderStatus(this.order)
    .subscribe(data => {
      console.log(data);
      alert(data);
      this.isEnabled = false;
      this.customerService.getCustomerDetailsById(this.val)
      .subscribe(info => {
        console.log(info);
        this.customer = info;

        if(this.customer != null) {
          this.customer.wallet += this.order.amount;

          this.customerService.updateWallet(this.customer)
          .subscribe(ele => {
            console.log(ele);
            alert(ele);
          })
        }
      });
    });
  }

  getClassOf(status: any, date: Date) {
    // let today = new Date()
    let str = this.curDate.toISOString().split('T')[0];
    // console.log(str)
    // console.log(typeof(str))
    // let d = new Date('2022-10-14');

    let str1 = date.toISOString().split('T')[0];
    //console.log(str == str1)
    if(status == 'PENDING' && str == str1) {
      return 'enable_cancel';
    } else {
      return 'disable_cancel';
    }
  }
}
