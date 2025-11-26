package com.student.easyStay.service;

import com.student.easyStay.model.Property;
import com.student.easyStay.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public Property addProperty(Property property) {
        return propertyRepository.save(property);
    }

    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    @Override
    public Property updateProperty(Long id, Property newData) {

        return propertyRepository.findById(id).map(existing -> {
            existing.setTitle(newData.getTitle());
            existing.setType(newData.getType());
            existing.setListingType(newData.getListingType());
            existing.setCity(newData.getCity());
            existing.setLocality(newData.getLocality());
            existing.setFullAddress(newData.getFullAddress());
            existing.setPrice(newData.getPrice());
            existing.setSecurityDeposit(newData.getSecurityDeposit());
            existing.setImageUrl(newData.getImageUrl());
            existing.setImageGallery(newData.getImageGallery());
            existing.setDescription(newData.getDescription());
            existing.setAmenities(newData.getAmenities());
            existing.setSellerName(newData.getSellerName());
            existing.setSellerPhone(newData.getSellerPhone());
            existing.setSellerEmail(newData.getSellerEmail());
            existing.setLocationUrl(newData.getLocationUrl());
            existing.setLatitude(newData.getLatitude());
            existing.setLongitude(newData.getLongitude());
            existing.setAvailable(newData.isAvailable());
            existing.setStatus(newData.getStatus());
            return propertyRepository.save(existing);

        }).orElse(null);
    }

    @Override
    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    @Override
    public List<Property> getPropertiesByCity(String city) {
        return propertyRepository.findByCity(city);
    }

    @Override
    public List<Property> getPropertiesBySeller(String sellerEmail) {
        return propertyRepository.findBySellerEmail(sellerEmail);
    }


    // ⭐ NEW → Buy, Rent, PG separate pages
    @Override
    public List<Property> getPropertiesByListingType(String listingType) {
        return propertyRepository.findByListingType(listingType);
    }

    // ⭐ NEW → Filter by city + type + listingType
    @Override
    public List<Property> filterProperties(String city, String type, String listingType) {
        return propertyRepository.filterProperties(city, type, listingType);
    }
}
