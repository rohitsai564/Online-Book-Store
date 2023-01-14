package com.sample.obs.OnlineBookStore.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sample.obs.OnlineBookStore.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	User findByUsername(String username);

    
}
