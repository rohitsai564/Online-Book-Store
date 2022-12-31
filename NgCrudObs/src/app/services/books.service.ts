import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Books } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl = 'http://localhost:8082/api/books';

  constructor(private http: HttpClient) { }

  listAllBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.baseUrl}`);
  }

  getBookById(id: number): Observable<Books> {
    return this.http.get<Books>(`${this.baseUrl}/${id}`);
  }

  listByStore(id: number): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.baseUrl}/store/${id}`);
  }

  listByAuthor(author: string): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.baseUrl}/author/${author}`);
  }

  listByCategory(cat:string): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.baseUrl}/category/${cat}`);
  }

  listByTitleContaining(title: string): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.baseUrl}/title/${title}`);
  }

  listAvailableBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.baseUrl}/available`);
  }

  uploadNewBook(book: Books): Observable<Books> {
    return this.http.post<Books>(`${this.baseUrl}`, book);
  }

  updatePrice(book: Books): Observable<any> {
    return this.http.put(`${this.baseUrl}/price/${book.price}/${book.bookId}`, book,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
    .pipe(map(data => {
      console.log(data.body);
      return data.body;
    }));
  }

  updateNumberOfCopies(book: Books): Observable<any> {
    return this.http.put(`${this.baseUrl}/copies/${book.no_copies}/${book.bookId}`, book,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
    .pipe(map(data => {
      console.log(data.body);
      return data.body;
    }));
  }

  updateAvailability(book: Books): Observable<any> {
    return this.http.put(`${this.baseUrl}/available/${book.availability}/${book.bookId}`, book,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
    .pipe(map(data => {
      console.log(data.body);
      return data.body;
    }));
  }

 

  deleteBookById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/book/${id}`,
    {headers: {'content-type': 'application/json'}, observe: 'response', responseType: 'text'})
      .pipe(map(data => {
        console.log(data.body);
        return data.body;
      }));
  }
}
