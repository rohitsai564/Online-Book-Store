package com.sample.obs.OnlineBookStore.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;



@Entity
//@Table(name = "books")
public class Books {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "bookid")
	private long bookId;
	
//	@Column(name = "title")
	private String title;
	
//	@Column(name = "author")
	private String author;
	
//	@Column(name = "storeid")
//	private long storeId;
	
//	@Column(name = "no_copies")
	private int no_copies;
	
//	@Column(name = "category")
	private String category;
	
//	@Column(name = "price")
	private double price;
	
//	@Column(name = "availability")
	private boolean availability;
	
	@Column(name = "imgbytes", length = 1000)
	private byte[] imgBytes;
	
	
	
	
	public byte[] getImgBytes() {
		return imgBytes;
	}

	public void setImgBytes(byte[] imgBytes) {
		this.imgBytes = imgBytes;
	}

	public Books() {
		
	}

	public Books(long bookId, String title, String author, long storeId, int no_copies, String category, double price,
			boolean availability) {
		this.bookId = bookId;
		this.title = title;
		this.author = author;
//		this.storeId = storeId;
		this.no_copies = no_copies;
		this.category = category;
		this.price = price;
		this.availability = availability;
	}

	public long getBookId() {
		return bookId;
	}

	public void setBookId(long bookId) {
		this.bookId = bookId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

//	public long getStoreId() {
//		return storeId;
//	}
//
//	public void setStoreId(long storeId) {
//		this.storeId = storeId;
//	}

	public int getNo_copies() {
		return no_copies;
	}

	public void setNo_copies(int no_copies) {
		this.no_copies = no_copies;
	}

	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}

	public double getPrice() {
		return price;
	}

	
	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isAvailability() {
		return availability;
	}

	public void setAvailability(boolean availability) {
		this.availability = availability;
	}

	

	/**
	 * toString method.
	 * @return String
	 */
//	@Override
//	public String toString() {
//		return "Books [bookId=" + bookId + ", title=" + title + ", author=" + author + ", storeId=" + storeId
//				+ ", no_copies=" + no_copies + ", category=" + category + ", price=" + price + ", availability="
//				+ availability + "]";
//	}
}
