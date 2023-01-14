package com.sample.obs.OnlineBookStore.controller;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sample.obs.OnlineBookStore.entity.Orders;
import com.sample.obs.OnlineBookStore.exceptions.ResourceNotFoundException;
import com.sample.obs.OnlineBookStore.service.OrdersService;

/**
 * Rest API for Orders
 * @author Pallavi Prasad
 *
 */
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class OrdersController {
	
	@Autowired
	private OrdersService service;
	
	/**
	 * to update the order status
	 * @param status for the order status
	 * @param id for the order id
	 * @return ResponseEntity<String>
	 */
	@PutMapping("/orders/status/{status}/{id}")
	@Transactional
	public ResponseEntity<String> updateOrderStatus(@PathVariable("status") int status, @PathVariable("id") long id) {
		String str = null;
		try {
			str = service.updateOrderStatus(status, id);
		} catch (ResourceNotFoundException e) {
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok().body(str);
	}
	
	/**
	 * to get a list of all orders.
	 * @return list of orders
	 */
	@GetMapping("/orders")
	public List<Orders> showAllOrders() {
		List<Orders> orders = service.listAllOrders();
		return orders;
	}
	
	/**
	 * to get a list based on delivery date
	 * @param date for the delivery date
	 * @return list of orders
	 */
	@GetMapping("/orders/delivery/{date}")
	public List<Orders> showByDeliveryDate(@PathVariable("date") LocalDate date) {
		List<Orders> orders = service.listAllOrdersByDeliveryDate(date);
		return orders;
	}
	
	/**
	 * to get a list based on order date.
	 * @param date for the order date
	 * @return list of orders
	 */
	@GetMapping("/orders/order/{date}/{id}")
	public List<Orders> showByOrderDate(@PathVariable("date") String date, @PathVariable("id") long id) {
		LocalDate ld = LocalDate.parse(date); 
		List<Orders> orders = service.listAllOrdersByOrderDate(ld, id);
		return orders;
	}
	
	/**
	 * to get a list of pending orders for today
	 * @return list of orders
	 */
	@GetMapping("/orders/pending")
	public List<Orders> showPendingOrdersForToday() {
		List<Orders> orders = service.listAllCurrentPendingOrders();
		return orders;
	}
	
	/**
	 * to get a list of current pending orders for a customer.
	 * @param id for the customer id
	 * @return list of orders
	 */
	@GetMapping("/orders/cpending/{id}")
	public List<Orders> showCurrentPendingOrdersForCustomer(@PathVariable("id") long id) {
		List<Orders> orders = service.listAllCurrentPendingOrdersForCustomer(id);
		return orders;
	}
	
	/**
	 * to get the order details.
	 * @param id for the order id
	 * @return ResponseEntity<Orders> object
	 */
	@GetMapping("/orders/{id}")
	public ResponseEntity<Orders> showOrderDetails(@PathVariable("id") long id) {
		Orders order = null;
		
		try {
			order = service.getOrderDetails(id);
		} catch (ResourceNotFoundException ex) {
			System.out.println(ex.getMessage());
		}
		return ResponseEntity.ok().body(order);
	}
	
	/**
	 * to get the customer history
	 * @param id for the customer id
	 * @return list of orders
	 */
	@GetMapping("/orders/history/{id}")
	public List<Orders> showAllCustomerOrders(@PathVariable("id") long id) {
		List<Orders> orders = service.listAllOrdersForCustomer(id);
		return orders;
	}
	
	/**
	 * to upload new order details
	 * @param order for the Orders object
	 * @return ResponseEntity<Orders> object
	 */
	@PostMapping("/orders")
	public ResponseEntity<Orders> saveOrderDetails(@RequestBody Orders order) {
		Orders o = service.saveOrder(order);
		return ResponseEntity.ok().body(o);
	}
	
	@GetMapping("/orders/all/{status}/{id}")
	public List<Orders> showAllCustomerOrdersByStatus(@PathVariable int status, @PathVariable long id) {
		return service.listByOrderStatusForCustomer(status, id);
	}
	
	@GetMapping("/orders/admin/{status}")
	public List<Orders> showAllByStatus(@PathVariable int status) {
		return service.listByOrderStatusAdmin(status);
	}
}
