import { BooksService } from './../services/books.service';
import { Orders } from './../models/orders.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from './../services/customer.service';
import { OrdersService } from './../services/orders.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  id = 0;

  orders: Orders[] = [];

  titles: string[] = [];

img:any = [];
  dateString = '';

  constructor(private orderService: OrdersService, private customerService: CustomerService,
    private router: Router, private route: ActivatedRoute, private bookService: BooksService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.listAllCustomerOrders(this.id)
    .subscribe(data => {
      console.log(data);
      this.orders = data;
      for(let i = 0; i < data.length; i++) {
        this.bookService.getBookById(data[i].bookId)
        .subscribe(ele => {
          console.log(ele);
          this.titles.push(ele.title);
          this.img.push(ele.imgBytes)
        });
      }
    }, error => console.log(error));
  }

  filterByStatus(status: number) {
    this.titles.splice(0, this.titles.length);
    this.orderService.showAllCustomerOrdersByStatus(status, this.id)
    .subscribe(data => {
      console.log(data);
      this.orders = data;
      for(let i = 0; i < data.length; i++) {
        this.bookService.getBookById(data[i].bookId)
        .subscribe(ele => {
          console.log(ele);
          this.titles.push(ele.title);
        });
      }
    }, error => console.log(error));
  }

  loadCurrentOrders() {
    this.orderService.listAllCustomerPendingOrders(this.id)
    .subscribe(data => {
      console.log(data)
      this.orders = data;

      if(this.orders.length == 0) {
        alert("No Pending Orders Today");
        this.loadOrders();
      }
    })
  }

  goHome() {
    if(this.id == 82) {
      this.router.navigate(['/adminDash', this.id]);
    }

    if(this.id != 82) {
      this.router.navigate(['/cDash', this.id]);
    }
  }

  showOrderDetails(num: number) {
    this.router.navigate(['/order', num, this.id]);
  }

  showByDate() {
    this.orderService.listOrdersByOrderDate(this.dateString, this.id)
    .subscribe(data => {
      console.log(data);
      this.orders = data;
    })
  }
}


