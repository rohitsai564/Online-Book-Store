package com.sample.obs.OnlineBookStore.repository;

import java.sql.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sample.obs.OnlineBookStore.entity.Orders;

/**
 * Orders repository.
 * @author Pallavi Prasad
 *
 */
@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long>{
	public List<Orders> findByDeliveryDate(Date date);
	
//	@Query(value = "SELECT * FROM ORDERS WHERE ORDERDATE = :date AND CUSTOMERID = :id", nativeQuery = true )
//	public List<Orders> findByOrderDate(@Param("date") Date date, @Param("id") long id);
//	
//	@Query(value = "SELECT * FROM ORDERS WHERE ORDERDATE = CURDATE() AND ORDERSTATUS = 0", nativeQuery=true)
//	public List<Orders> findCurrentPendingOrders();
	
//	@Query(value = "SELECT * FROM ORDERS WHERE ORDERDATE = CURDATE() AND ORDERSTATUS = 0 AND CUSTOMERID = :id", nativeQuery=true)
//	public List<Orders> findPendingOrdersForCustomer(@Param("id") long id);
	
	
//	@Query(value = "SELECT * FROM ORDERS ORDER BY ORDERID DESC LIMIT 1", nativeQuery=true)
//	public Orders findTopByOrderByOrderIdDesc();
	
//	@Modifying
//	@Query(value = "UPDATE ORDERS SET ORDERSTATUS = :status WHERE ORDERID = :id", nativeQuery=true)
//	public int updateOrderStatus(@Param("status") int status, @Param("id") long id);
	
//	@Query(value = "SELECT * FROM ORDERS WHERE ORDERSTATUS = :status AND CUSTOMERID = :id", nativeQuery=true)
//	public List<Orders> listByOrderStatusForCustomer(@Param("status") int status, @Param("id") long id);
	
	public List<Orders> findByOrderStatus(int status);
	
	
	@Query("SELECT o FROM Orders o WHERE o.orderDate = :date AND o.customerId = :id")
	public List<Orders> findByOrderDate(@Param("date") Date date, @Param("id") long id);
	
	@Query("SELECT o FROM Orders o WHERE o.orderDate = CURDATE() AND o.orderStatus = 0")
	public List<Orders> findCurrentPendingOrders();
	
	@Query("SELECT o FROM Orders o WHERE o.orderDate = CURDATE() AND o.orderStatus = 0 AND o.customerId = :id")
	public List<Orders> findPendingOrdersForCustomer(@Param("id") long id);
	
	public List<Orders> findByCustomerId(long id);
	
	//@Query("SELECT o FROM Orders o ORDER BY o.orderid DESC limit 1")
	public Orders findTopByOrderByOrderIdDesc();
	
	@Transactional
	@Modifying
	@Query("UPDATE Orders SET orderStatus = :status WHERE orderid = :id")
	public int updateOrderStatus(@Param("status") int status, @Param("id") long id);
	
	@Query("SELECT o FROM Orders o WHERE o.orderStatus = :status AND o.customerId = :id")
	public List<Orders> listByOrderStatusForCustomer(@Param("status") int status, @Param("id") long id);
	
}
