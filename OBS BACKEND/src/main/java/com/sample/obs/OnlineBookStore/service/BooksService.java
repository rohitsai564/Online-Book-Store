package com.sample.obs.OnlineBookStore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.obs.OnlineBookStore.entity.Books;
import com.sample.obs.OnlineBookStore.repository.BooksRepository;


@Service
public class BooksService {
	
//	private byte[] bytes;
	@Autowired
	private BooksRepository repo;
	
	/**
	 * to get a listing of all books.
	 * @return list of books
	 */
	public List<Books> listAllBooks() {
		List<Books> books = repo.findAll();
		return books;
	}
	
	/**
	 * to get the book details.
	 * @param id for the book id - long
	 * @return Books object
	 */
	public Books retrieveBookById(long id) {
		Books b = repo.findById(id).get();
		return b;
	}
	
	/**
	 * to get a listing of books based on author.
	 * @param author for the author
	 * @return list of books
	 */
	public List<Books> listBooksByAuthor(String author) {
		List<Books> books = repo.findAllByAuthor(author);
		return books;
	}
	
	/**
	 * to get a listing of books based on category.
	 * @param category for the category
	 * @return list of books
	 */
	public List<Books> listBooksByCategory(String category){
		List<Books> books = repo.findAllByCategory(category);
		return books;
	}
	
	/**
	 * to get a listing of books based on store id.
	 * @param id for the store id
	 * @return list of books
	 */
//	public List<Books> listBooksByStoreId(long id) {
//		List<Books> books = repo.findAllByStoreId(id);
//		return books;
//	}
	
	/**
	 * to get a listing of books based on store id.
	 * @param title for the title
	 * @return list of books
	 */
	public List<Books> listBooksByTitleContaining(String title) {
		List<Books> books = repo.findAllByTitleContaining(title);
		return books;
	}
	
	/**
	 * to get a listing of available books.
	 * @return list of books
	 */
	public List<Books> listByAvailability() {
		List<Books> books = repo.findByAvailability();
		return books;
	}
	
	/**
	 * to add new book details.
	 * @param book for the Books object
	 * @return Books object
	 */
//	public Books saveBook(Books book) {
//		Books b = repo.findTopByOrderByBookIdDesc();
//		
//		long id = 501;
//		
//		if (b != null) {
//			id = b.getBookId() + 1;
//		}
//		
//		book.setBookId(id);
//		book.setImgBytes(this.bytes);
//		b = repo.save(book);
//		this.bytes = null;
//		return b;
//	}
	
	/**
	 * to update price for a book
	 * @param price for the new price
	 * @param id for the book id
	 * @return String
	 */
	public String updatePrice(double price, long id) {
		String str = "Unable to update price";
		
		int res = repo.updatePrice(price, id);
		if (res > 0) {
			str = "Price updated";
		}
		
		return str;
	}
	
	/**
	 * to update the number of copies.
	 * @param copies for the updated copies
	 * @param id for the book id
	 * @return String
	 */
	public String updateNoCopies(int copies, long id) {
		String str = "Unable to update number of copies";
		
		int res = repo.updateNoCopies(copies, id);
		if(res > 0) {
			str = "Number of copies updated.";
		}
		
		return str;
	}
	
	/**
	 * to update availability of book.
	 * @param availability for the availability
	 * @param id for the book id.
	 * @return String
	 */
	public String updateAvailability(boolean availability, long id) {
		String str = "Unable to update book availability";
		
		int res = repo.updateAvailability(availability, id);
		if(res > 0) {
			str = "Book availability updated.";
		}
		
		return str;
	}
	
	/**
	 * to delete books when a store is deleted.
	 * @param id for the store id
	 * @return String
	 */
//	public String deleteBooksByStore(long id) {
//		String str = "Unable to delete books";
//		
//		int res = repo.deleteByStoreId(id);
//		if(res > 0) {
//			str = "Books for Store with id: " + id + " deleted.";
//		}
//		
//		return str;
//	}
//	
	public String deleteBookById(long id) {
		String str = "Unable to delete book";
		
		int res = repo.deleteBookById(id);
		if(res > 0) {
			str = "Book with id: " + id + " deleted.";
		}
		
		return str;
	}
}
