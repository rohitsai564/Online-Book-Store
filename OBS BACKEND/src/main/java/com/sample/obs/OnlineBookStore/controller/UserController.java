package com.sample.obs.OnlineBookStore.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sample.obs.OnlineBookStore.entity.User;
import com.sample.obs.OnlineBookStore.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:4200")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;

    @GetMapping("/login")
    public User login(Principal principal) {//Dependency Injection: DI:IoC: Inversion Of Control
        String username = principal.getName();
        User user = userRepository.findByUsername(username);
        user.setPassword("*******");
        return user;
}
}
