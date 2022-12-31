
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Books } from '../models/books.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  id = 0;
  val = 0;

  book: Books = {
    bookId: 0,
    title: '',
    author: '',
    availability: true,
    no_copies: 0,
    category: '',
    price: 0,
    imgBytes:''
  };


  avail = 'No';

  constructor(private router: Router, private route: ActivatedRoute,
    private bookService: BooksService) { }

  ngOnInit(): void {
    //book id
    this.id = this.route.snapshot.params['id'];
    //admin id
    this.val = this.route.snapshot.params['val'];
    this.loadBookDetails();
  }

  goToDash() {
    this.router.navigate(['/adminDash', this.val]);
  }



  showProfileDetails() {
    this.router.navigate(['/profile', this.val]);
  }

  addBookPage() {
    this.router.navigate(['/addBook', this.val]);
  }

 

  loadBookDetails() {
    this.bookService.getBookById(this.id)
    .subscribe(data => {
      console.log(data);
      this.book = data;
      if(this.book.availability == true) {
        this.avail = 'Yes'
      }
     
    }, error => console.log(error));
  }

  updatePrice() {
    this.bookService.updatePrice(this.book)
    .subscribe(data => {
      console.log(data);
      alert(data);
    })
  }

  updateCopies() {
    this.bookService.updateNumberOfCopies(this.book)
    .subscribe(data => {
      console.log(data);
      alert(data);
    })
  }

  deleteABook() {
    // alert("Code not working");
    this.bookService.deleteBookById(this.book.bookId)
    .subscribe(data => {
      console.log(data);
      alert(data);
    }, error => console.log(error));
  }
}
