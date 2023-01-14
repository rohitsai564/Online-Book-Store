package com.sample.obs.OnlineBookStore.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sample.obs.OnlineBookStore.utils.OrderStatus;

/**
 * Orders class.
 * @author Pallavi Prasad
 *
 */
@Entity
@Table(name = "orders")
public class Orders {
	@Id
	@Column(name = "orderid")
	private long orderId;
	
	@Column(name = "orderdate")
	private LocalDate orderDate;
	
	@Column(name = "deliverydate")
	private LocalDate deliveryDate;
	
	@Column(name = "amount")
	private double amount;
	
	@Column(name = "quantity")
	private int quantity;
	
	@Column(name = "customerid")
	private long customerId;
	
	@Column(name = "bookid")
	private long bookId;
	
	@Column(name = "orderstatus")
	private OrderStatus orderStatus;
	
	/**
	 * default constructor.
	 */
	public Orders() {
		
	}

	/**
	 * parameterized constructor.
	 * @param orderId long
	 * @param orderDate LocalDate
	 * @param deliveryDate LocalDate
	 * @param amount double
	 * @param quantity int
	 * @param customerId long
	 * @param bookId long
	 * @param orderStatus OrderStatus enum
	 */
	public Orders(long orderId, LocalDate orderDate, LocalDate deliveryDate, double amount, int quantity,
			long customerId, long bookId, OrderStatus orderStatus) {
		this.orderId = orderId;
		this.orderDate = orderDate;
		this.deliveryDate = deliveryDate;
		this.amount = amount;
		this.quantity = quantity;
		this.customerId = customerId;
		this.bookId = bookId;
		this.orderStatus = orderStatus;
	}

	/**
	 * @return the orderId
	 */
	public long getOrderId() {
		return orderId;
	}

	/**
	 * @param orderId the orderId to set
	 */
	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	/**
	 * @return the orderDate
	 */
	public LocalDate getOrderDate() {
		return orderDate;
	}

	/**
	 * @param orderDate the orderDate to set
	 */
	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}

	/**
	 * @return the deliveryDate
	 */
	public LocalDate getDeliveryDate() {
		return deliveryDate;
	}

	/**
	 * @param deliveryDate the deliveryDate to set
	 */
	public void setDeliveryDate(LocalDate deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	/**
	 * @return the amount
	 */
	public double getAmount() {
		return amount;
	}

	/**
	 * @param amount the amount to set
	 */
	public void setAmount(double amount) {
		this.amount = amount;
	}

	/**
	 * @return the quantity
	 */
	public int getQuantity() {
		return quantity;
	}

	/**
	 * @param quantity the quantity to set
	 */
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	/**
	 * @return the customerId
	 */
	public long getCustomerId() {
		return customerId;
	}

	/**
	 * @param customerId the customerId to set
	 */
	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	/**
	 * @return the bookId
	 */
	public long getBookId() {
		return bookId;
	}

	/**
	 * @param bookId the bookId to set
	 */
	public void setBookId(long bookId) {
		this.bookId = bookId;
	}

	/**
	 * @return the orderStatus
	 */
	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	/**
	 * @param orderStatus the orderStatus to set
	 */
	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	/**
	 * toString method.
	 * @return String
	 */
	@Override
	public String toString() {
		return "Orders [orderId=" + orderId + ", orderDate=" + orderDate + ", deliveryDate=" + deliveryDate
				+ ", amount=" + amount + ", quantity=" + quantity + ", customerId=" + customerId + ", bookId=" + bookId
				+ ", orderStatus=" + orderStatus + "]";
	}
}
