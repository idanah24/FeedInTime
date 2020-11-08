package com.fooddelivery.feedintime.restaurant;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;


/**
 * Restaurnts Hardcoded Service
 * TODO: Replace with JPA database connection in future
 * @author Idan
 *
 */

@Service
public class RestaurantsHardcodedService {
	
	private static List<Restaurant> restaurants = new ArrayList<>();
	private static Long idCount = (long) 0;
	
	static {
		restaurants.add(new Restaurant(++idCount, "Lital's bakery", "London", "12354565", "Cakes", "Lital"));
		restaurants.add(new Restaurant(++idCount, "Lital's Gourmet", "London", "13242356", "Gourmet", "Lital"));
		restaurants.add(new Restaurant(++idCount, "Some Restaurant", "Tel Aviv", "2353462123", "Some Food", "Some Owner"));
		
	}

	public List<Restaurant> findAll(){
		return restaurants;
	}
	
	public Restaurant getById(Long id) {
		for(Restaurant rest : restaurants) {
			if(rest.getId() == id) {
				return rest;
			}
		}
		return null;
	}
	
}
