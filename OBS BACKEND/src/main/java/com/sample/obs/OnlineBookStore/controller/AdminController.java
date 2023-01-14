package com.sample.obs.OnlineBookStore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sample.obs.OnlineBookStore.entity.Admin;
import com.sample.obs.OnlineBookStore.entity.User;
import com.sample.obs.OnlineBookStore.repository.AdminRepository;
import com.sample.obs.OnlineBookStore.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AdminRepository adminRepository;

	/*
	 * Adding Admin
	 */

	@PostMapping("/add")
	public Admin postAdmin(@RequestBody Admin admin) {
		User user = admin.getUser();
		user.setRole("ADMIN");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user = userRepository.save(user);
		admin.setUser(user);
		admin = adminRepository.save(admin);
		admin.getUser().setPassword("------------");
		return admin;
	}
}