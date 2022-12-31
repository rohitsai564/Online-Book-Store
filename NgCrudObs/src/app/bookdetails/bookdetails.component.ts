import { CustomerService } from './../services/customer.service';
import { Customer } from './../models/customer.model';
import { Books } from './../models/books.model';
import { BooksService } from './../services/books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  customer: Customer = {
    customerid: 0,
    name:'doe',
    address: '',
    phone: '',
    wallet: 0.0
  }
  book!: Books;
  id = 0;
  val = 0;
  today = new Date();

  constructor(private bookService: BooksService, private route: ActivatedRoute,
    private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.val = this.route.snapshot.params['val'];
    this.loadBookDetails(this.id);
  }

  loadBookDetails(bId: number) {
    // if (cust != 0) {
    //   this.customerService.getCustomerDetailsById(cust)
    //   .subscribe(info => {
    //     console.log(info);
    //     this.customer = info;
    //   }, error => console.log(error))
    // }
    this.bookService.getBookById(bId)
    .subscribe(data => {
      console.log(data);
      this.book = data;
    }, error => console.log(error));
  }

  goToLogin() {
    if(this.val == 0) {
      this.router.navigate(['/login']);
    }
  }

  goHome() {
    if(this.val == 0) {
      this.router.navigate(['/home']);
    }

    if (this.val > 100 && this.val < 201) {
      this.router.navigate(['/cDash', this.val]);
    }

    if (this.val > 200 && this.val < 301) {
      this.router.navigate(['/adminDash', this.val]);
    }

  }
}
