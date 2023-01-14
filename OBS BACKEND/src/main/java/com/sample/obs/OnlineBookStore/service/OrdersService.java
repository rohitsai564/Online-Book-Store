package com.sample.obs.OnlineBookStore.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.obs.OnlineBookStore.entity.Orders;
import com.sample.obs.OnlineBookStore.exceptions.ResourceNotFoundException;
import com.sample.obs.OnlineBookStore.repository.OrdersRepository;
import com.sample.obs.OnlineBookStore.utils.OrderStatus;

/**
 * Service class for Orders.
 * @author Pallavi Prasad
 *
 */
@Service
public class OrdersService {
	@Autowired
	private OrdersRepository repo;
	
	/**
	 * to list all orders.
	 * @return list of orders
	 */
	public List<Orders> listAllOrders() {
		List<Orders> orders = repo.findAll();
		return orders;
	}
	
	/**
	 * to list orders by delivery date
	 * @param date for the delivery date
	 * @return list of orders
	 */
	public List<Orders> listAllOrdersByDeliveryDate(LocalDate date) {
		Date del = Date.valueOf(date);
		List<Orders> orders = repo.findByDeliveryDate(del);
		return orders;
	}
	
	/**
	 * list all orders by order date
	 * @param date for the order date
	 * @return list of orders
	 */
	public List<Orders> listAllOrdersByOrderDate(LocalDate date, long id) {
		Date del = Date.valueOf(date);
		List<Orders> orders = repo.findByOrderDate(del, id);
		return orders;
	}
	
	/**
	 * list all pending orders for today.
	 * @return list of orders
	 */
	public List<Orders> listAllCurrentPendingOrders() {
		List<Orders> orders = repo.findCurrentPendingOrders();
		return orders;
	}
	
	/**
	 * list all today's pending orders for a customer
	 * @param id for the customer id
	 * @return list of orders
	 */
	public List<Orders> listAllCurrentPendingOrdersForCustomer(long id) {
		List<Orders> orders = repo.findPendingOrdersForCustomer(id);
		return orders;
	}
	
	/**
	 * list customer's order history.
	 * @param id for the customer id
	 * @return list of orders
	 */
	public List<Orders> listAllOrdersForCustomer(long id) {
		List<Orders> orders = repo.findByCustomerId(id);
		return orders;
	}
	
	/**
	 * to get order details
	 * @param id for the order id
	 * @return Orders object
	 * @throws ResourceNotFoundException for the exception
	 */
	public Orders getOrderDetails(long id) throws ResourceNotFoundException {
		Orders order = repo.findById(id).get();
		
		if (order == null) {
			throw new ResourceNotFoundException("Order Details Not Found");
		}
		return order;
	}
	
	/**
	 * to add new order details
	 * @param order for the Orders object
	 * @return Orders object
	 */
	public Orders saveOrder(Orders order) {
		
		Orders o = repo.findTopByOrderByOrderIdDesc();
		
		String stat = order.getOrderStatus().toString().toUpperCase();
		
		OrderStatus or = OrderStatus.valueOf(stat);
		
		order.setOrderStatus(or);
		
		long id = 401;
		if(o != null) {
			id = o.getOrderId() + 1;
		}
		
		order.setOrderId(id);
		
		o = repo.save(order);
		
		return o;
	}
	
	/**
	 * to update the order status
	 * @param status for the order status
	 * @param id for the order id
	 * @return String
	 */
	public String updateOrderStatus(int status, long id) throws ResourceNotFoundException{
		String str = "Unable to update status";
		
		Orders o = repo.findById(id).get();

		if(o == null) {
			throw new ResourceNotFoundException("Order Details Not Found");
		}
		
		int res = repo.updateOrderStatus(status, id);
		
		if(res > 0) {
			str = "Order status updated";
		}
		
		return str;
	}
	
	public List<Orders> listByOrderStatusForCustomer(int status, long id) {
		return repo.listByOrderStatusForCustomer(status, id);
	}
	
	public List<Orders> listByOrderStatusAdmin(int status) {
		return repo.findByOrderStatus(status);
	}
}
