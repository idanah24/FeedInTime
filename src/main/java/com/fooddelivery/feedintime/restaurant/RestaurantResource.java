package com.fooddelivery.feedintime.restaurant;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestaurantResource {


	@Autowired
	private RestaurantRepository db;
	
	@GetMapping("/load")
	public void load() {
		db.save(new Restaurant("Lital's bakery", "London", "21348239478", "Cakes", "Lital"));
	}
	
	
//	TODO: Insert CREATE here
	
	@GetMapping("/restaurants")
	public List<Restaurant> getAllRestaurants(){
//		return service.findAll();
		return db.findAll();
	}
	
//	@GetMapping("/restaurants/{id}")
//	public Restaurant getRestaurantById(@PathVariable Long id) {
//		Restaurant rest = service.getById(id);
//		if(rest == null) {
//			throw new ResourceNotFoundException("Restaurant id=" + id + " not found");
//		}
//		return rest;
//	}
//	
//	@PutMapping("/restaurants/{id}/update")
//	public ResponseEntity<Object> updateRestaurant(
//			@PathVariable Long id,
//			@RequestParam("name") String newName,
//			@RequestParam("address") String newAddress,
//			@RequestParam("phoneNumber") String newPhoneNumber,
//			@RequestParam("menu") String newMenu,
//			@RequestParam("owner") String newOwner){
////		TODO: Add authorization to this part - Only owner/admin can update
//		Restaurant rest = service.getById(id);
//		
//		if(rest == null) {
//			throw new ResourceNotFoundException("Restaurant id=" + id + " not found");
//		}
//		
//		service.updateRestaurant(rest, newName, newAddress, newPhoneNumber, newMenu, newOwner);
//		
//		return ResponseEntity.status(HttpStatus.OK).build();
//	}
	
	
}
