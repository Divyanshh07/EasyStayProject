package com.student.easyStay.repository;

import com.student.easyStay.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByCity(String city);

    List<Property> findBySellerEmail(String sellerEmail);

    // Buy / Rent / PG
    List<Property> findByListingType(String listingType);

    // Advanced Filter Query
    @Query("SELECT p FROM Property p " +
            "WHERE (:city IS NULL OR p.city = :city) " +
            "AND (:type IS NULL OR p.type = :type) " +
            "AND (:listingType IS NULL OR p.listingType = :listingType)")
    List<Property> filterProperties(String city, String type, String listingType);

}
