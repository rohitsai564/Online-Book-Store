package com.sample.obs.OnlineBookStore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sample.obs.OnlineBookStore.entity.Admin;



public interface AdminRepository extends JpaRepository<Admin,Long>{
	
//	@Query("select b from Books b where b.user.username=?1")
//	Admin getAdminByUsername(String username);

//	@Query("select a from admin a where a.user.Id=?1")
//	Admin getAdminById(Long id);
}