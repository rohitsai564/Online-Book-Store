import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from './../services/books.service';
import { Component, OnInit } from '@angular/core';
import { Books } from '../models/books.model';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {

  books: Books[] = [];
  actualSet: any[] = [];

  id = 0;

  constructor(private bookService: BooksService, private router: Router,
    private route: ActivatedRoute) { }

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

  showBookDetails(val: number) {
    this.router.navigate(['/details', val, this.id]);
  }

  showProfileDetails() {
    this.router.navigate(['/profile', this.id]);
  }

  editBookDetails(val: number) {
    this.router.navigate(['/editbook', val, this.id]);
  }


  addNewBookDetails() {
    this.router.navigate(['/addbook', this.id]);
  }
}
