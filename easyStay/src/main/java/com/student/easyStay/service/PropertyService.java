package com.student.easyStay.service;

import com.student.easyStay.model.Property;

import java.util.List;
import java.util.Optional;

public interface PropertyService {

    Property addProperty(Property property);

    List<Property> getAllProperties();

    Optional<Property> getPropertyById(Long id);

    Property updateProperty(Long id, Property property);

    void deleteProperty(Long id);

    List<Property> getPropertiesByCity(String city);

    List<Property> getPropertiesBySeller(String sellerNumber);

    // ⭐ NEW → Buy, Rent, PG separate pages
    List<Property> getPropertiesByListingType(String listingType);

    // ⭐ NEW → Advanced Filter
    List<Property> filterProperties(String city, String type, String listingType);
}
