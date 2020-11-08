package com.fooddelivery.feedintime.restaurant;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fooddelivery.feedintime.exceptions.ResourceNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class RestaurantResource {

	@Autowired
	private RestaurantsHardcodedService service;
	
	@GetMapping("/restaurants")
	public List<Restaurant> getAllRestaurants(){
		return service.findAll();
	}
	
	
	@GetMapping("/restaurants/{id}")
	public Restaurant getRestaurantById(@PathVariable Long id) {
		Restaurant rest = service.getById(id);
		
		if(rest == null) {
			throw new ResourceNotFoundException("Restaurant id=" + id + " not found");
		}
		
		return rest;
		
	}
}
