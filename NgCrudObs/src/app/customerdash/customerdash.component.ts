import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';
import { Books } from '../models/books.model';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customerdash',
  templateUrl: './customerdash.component.html',
  styleUrls: ['./customerdash.component.css']
})
export class CustomerdashComponent implements OnInit {

  books: Books[] = [];
  actualSet: any[] = [];

  customer: Customer = {
    customerid: 0,
    name:'doe',
    address: '',
    phone: '',
    wallet: 0.0
  }

  id = 0;

  constructor(private bookService: BooksService, private router: Router,
    private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.loadBooks();
  }

  splitData(arr: any, size: number) {
    let newArr: Books[] = [];
    for(let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  }

  loadBooks(): void {
    this.bookService.listAllBooks()
    .subscribe(data => {
      console.log(data);
      this.books = data;
      this.actualSet = this.splitData(this.books, 3);
      console.log("Actual: ", this.actualSet);
    }, error => console.log(error));
  }

  showProfileDetails() {
    this.router.navigate(['/cDetails', this.id]);
  }

  showBookDetails(val: number) {
    this.router.navigate(['/details', val, this.id]);
  }

  filterBooks(cat: string) {
    this.bookService.listByCategory(cat)
    .subscribe(data => {
      console.log(data);
      this.books = data;
      this.actualSet = this.splitData(this.books, 3);
    }, error => console.log(error));
  }

  goToCart(bId: number){
    this.router.navigate(['/cart', bId, this.id]);
  }

  logout() {
    this.id = 0;
    this.router.navigate(['/home']);
  }

  goToOrders() {
    this.router.navigate(['/orders', this.id])
  }
}
