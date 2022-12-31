import { BooksService } from './../services/books.service';
import { Component, OnInit } from '@angular/core';
import { Books } from '../models/books.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Books[] = [];
  actualSet: any[] = [];

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit(): void {
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

  showBookDetails(id: number, c: number) {
    this.router.navigate(['/details', id, c]);
  }

  filterBooks(cat: string) {
    this.bookService.listByCategory(cat)
    .subscribe(data => {
      console.log(data);
      this.books = data;
      this.actualSet = this.splitData(this.books, 3);
    }, error => console.log(error));
  }

  goToCart(id: number, val: number){
    this.router.navigate(['/cart', id, val]);
  }
}