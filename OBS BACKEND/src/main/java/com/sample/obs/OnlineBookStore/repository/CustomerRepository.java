package com.sample.obs.OnlineBookStore.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sample.obs.OnlineBookStore.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
	public Customer findTopByOrderByCustomerIdDesc();
	
	
//	@Modifying
//	@Query(value = "UPDATE CUSTOMER SET PHONE = :ph WHERE CUSTOMERID = :id", nativeQuery=true)
//	public int updatePhone(@Param("ph") String ph, @Param("id") long id);
	
//	@Modifying
//	@Query(value = "UPDATE CUSTOMER SET WALLET = :wallet WHERE CUSTOMERID = :id", nativeQuery=true)
//	public int updateWalletAmount(@Param("wallet") double wallet, @Param("id") long id);
	
	
//	@Modifying
//	@Query(value="UPDATE CUSTOMER SET ADDRESS = :addr WHERE CUSTOMERID = :id ", nativeQuery=true)
//	public int updateAddress(@Param("id") long id, @Param("addr") String addr);
	
	@Transactional
	@Modifying
	@Query("UPDATE Customer SET phone = :ph WHERE customerid = :id")
	public int updatePhone(@Param("ph") String ph, @Param("id") long id);
	
	@Transactional
	@Modifying
	@Query("UPDATE Customer SET wallet = :wallet WHERE customerid = :id")
	public int updateWalletAmount(@Param("wallet") double wallet, @Param("id") long id);
	
	@Transactional
	@Modifying
	@Query("UPDATE Customer SET address = :addr WHERE customerid = :id ")
	public int updateAddress(@Param("id") long id, @Param("addr") String addr);
	
}
