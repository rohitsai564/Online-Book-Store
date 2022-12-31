import { BooksService } from './../services/books.service';
import { Books } from './../models/books.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  id = 0;
  book = new Books();
    private selectedFile: any;
  imgURL: any;
  // book: Books = {
  //   bookId: 0,
  //   title: '',
  //   author: '',
  //   availability: true,
  //   no_copies: 0,
  //   category: '',
  //   price: 0,
  //   imgBytes:any
    
  // };
 

  constructor(private router: Router,
    private route: ActivatedRoute, private bookService: BooksService, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  goToDash() {
    this.router.navigate(['/adminDash', this.id]);
  }



  showProfileDetails() {
    this.router.navigate(['/profile', this.id]);
  }

  public onFileChanged(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  uploadBookDetails() {
    //console.log(this.book);
    // this.bookService.uploadNewBook(this.book)
    // .subscribe(data => {
    //   console.log(data);
    //   if (data != null) {
    //     alert("New Book Details Uploaded");
    //     window.location.reload();
    //   } else {
    //     alert ("Unable to Upload Details");
    //   }
    // })

    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.http.post('http://localhost:8082/api/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.bookService.uploadNewBook(this.book).subscribe(
            (_book) => {
              this.router.navigate(['adminDash']);
            }
          );
          console.log('Image uploaded successfully');
        } else {
          console.log('Image not uploaded successfully');
        }
        console.log(response);
          if (response != null) {
            alert("New Book Details Uploaded");
            window.location.reload();
          } else {
            alert ("Unable to Upload Details");
          }
      }
    );
  }
}
