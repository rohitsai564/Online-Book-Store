package com.sample.obs.OnlineBookStore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sample.obs.OnlineBookStore.entity.Customer;
import com.sample.obs.OnlineBookStore.entity.User;
import com.sample.obs.OnlineBookStore.exceptions.ResourceNotFoundException;
import com.sample.obs.OnlineBookStore.repository.CustomerRepository;
import com.sample.obs.OnlineBookStore.repository.UserRepository;

@Service
public class CustomerService {
	
	
	
	@Autowired
	private CustomerRepository repo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	/**
	 * to get a list of customers
	 * @return list of customers
	 */
	public List<Customer> getAllCustomers() {
		return repo.findAll();
	}
	
	
	
	/**
	 * to get customer details based on customer id
	 * @param id for the customer id - long
	 * @return Customer object
	 * @throws ResourceNotFoundException for the exception
	 */
	public Customer retrieveCustomerById(long id) throws ResourceNotFoundException {
		Customer c = repo.findById(id).get();
		
		if (c == null) {
			throw new ResourceNotFoundException("Customer with id: " + id + " not found");
		}
		return c;
	}
	
	
	
	public Customer postCustomer(Customer customer) {
		User user = customer.getUser();
		user.setRole("CUSTOMER");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user = userRepository.save(user);
		customer = repo.save(customer);
		customer.getUser().setPassword("-----------------");
		return customer;
	}
//	@PostMapping("/customer/post")
//	public Customer postCustomer(@RequestBody Customer customer) {
//	User user = customer.getUser();
//	user.setRole("CUSTOMER");
//	user.setPassword(passwordEncoder.encode(user.getPassword()));
//	user = userRepository.save(user);
//	customer.setUser(user);
//	customer = customerRepository.save(customer);
//	customer.getUser().setPassword("------------");
//	return customer;
//	}
	
	
	
	/**
	 * to update phone number.
	 * @param ph for the new phone number - String
	 * @param id for the customer id - long
	 * @return String
	 */
	public String updatePhone(String ph, long id) {
		String str = "Unable to update Phone number";
		
		int res = repo.updatePhone(ph, id);
		if(res > 0) {
			str = "Phone number updated";
		}
		
		return str;
	}
	
	/**
	 * to update the wallet amount
	 * @param wallet for the wallet amount
	 * @param id for the customer id
	 * @return String
	 */
	public String updateWallet(double wallet, long id) {
		String str = "Unable to update wallet";
		
		int res = repo.updateWalletAmount(wallet, id);
		if(res > 0) {
			str = "Wallet amount updated";
		}
		
		return str;
	}
	
	
	
	/**
	 * to update the address
	 * @param addr for the address
	 * @param id for the customer id
	 * @return String
	 */
	public String updateAddress(String addr, long id) {
		String str = "Unable to update address";
		
		int res = repo.updateAddress(id, addr);
		
		if(res > 0) {
			str = "Address updated";
		}
		
		return str;
	}
}
