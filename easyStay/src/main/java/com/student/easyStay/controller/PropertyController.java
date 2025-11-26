package com.student.easyStay.controller;

import com.student.easyStay.model.Property;
import com.student.easyStay.model.User;
import com.student.easyStay.service.PropertyService;
import com.student.easyStay.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * PropertyController - returns property data.
 * The GET /{id} endpoint now returns a combined JSON that includes
 * seller_phone and seller_address (if available from users table).
 */
@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    // NEW: need UserService to look up seller phone/address
    @Autowired
    private UserService userService;

    // ------------------- Add Property -------------------
    @PostMapping("/add")
    public Property addProperty(@RequestBody Property property) {
        return propertyService.addProperty(property);
    }

    // ------------------- Get All Properties -------------------
    @GetMapping("/all")
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    // ------------------- Get By ID (returns property + seller info if available) -------------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Property> opt = propertyService.getPropertyById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Property not found"));
        }

        Property p = opt.get();

        // Build response map from property fields (include commonly used ones)
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("id", p.getId());
        resp.put("title", p.getTitle());
        resp.put("city", p.getCity());
        resp.put("locality", p.getLocality());
        resp.put("fullAddress", p.getFullAddress());
        resp.put("description", p.getDescription());
        resp.put("imageUrl", p.getImageUrl());
        resp.put("imageGallery", p.getImageGallery()); // if your entity has this
        resp.put("latitude", p.getLatitude());
        resp.put("longitude", p.getLongitude());
        resp.put("listingType", p.getListingType());
        resp.put("type", p.getType());
        resp.put("price", p.getPrice());
        resp.put("securityDeposit", p.getSecurityDeposit());
        resp.put("status", p.getStatus());
        resp.put("available", p.isAvailable());
        resp.put("postedAt", p.getPostedAt());
        // seller fields present in property table (old fields)
        resp.put("sellerName", p.getSellerName());
        resp.put("sellerEmail", p.getSellerEmail());
        resp.put("sellerPhone", p.getSellerPhone());

        // Try to find seller in users table to obtain seller_phone and seller_address
        if (p.getSellerEmail() != null) {
            Optional<User> sellerOpt = userService.getUserByEmail(p.getSellerEmail());
            if (sellerOpt.isPresent()) {
                User seller = sellerOpt.get();
                // include snake_case and camelCase keys so frontend works with either
                resp.put("seller_phone", seller.getSellerPhone());
                resp.put("sellerPhone", seller.getSellerPhone());
                resp.put("seller_address", seller.getSellerAddress());
                resp.put("sellerAddress", seller.getSellerAddress());
            }
        }

        return ResponseEntity.ok(resp);
    }

    // ------------------- Update Property -------------------
    @PutMapping("/update/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
        return propertyService.updateProperty(id, property);
    }

    // ------------------- Delete Property -------------------
    @DeleteMapping("/delete/{id}")
    public String deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return "Deleted Successfully!";
    }

    // ------------------- CITY FILTER -------------------
    @GetMapping("/city/{city}")
    public List<Property> getByCity(@PathVariable String city) {
        return propertyService.getPropertiesByCity(city);
    }

    // ------------------------------------------------------------
    // ✔ FETCH PROPERTIES OF A SELLER USING sellerEmail
    // URL → /api/properties/seller/{sellerEmail}
    // ------------------------------------------------------------
    @GetMapping("/seller/{sellerEmail}")
    public List<Property> getPropertiesBySeller(@PathVariable String sellerEmail) {
        return propertyService.getPropertiesBySeller(sellerEmail);
    }

    // ------------------------------------------------------------
    // BUY Properties
    // ------------------------------------------------------------
    @GetMapping("/buy")
    public List<Property> getBuyProperties() {
        return propertyService.getPropertiesByListingType("Buy");
    }

    // ------------------------------------------------------------
    // RENT Properties
    // ------------------------------------------------------------
    @GetMapping("/rent")
    public List<Property> getRentProperties() {
        return propertyService.getPropertiesByListingType("Rent");
    }

    // ------------------------------------------------------------
    // PG Properties
    // ------------------------------------------------------------
    @GetMapping("/pg")
    public List<Property> getPgProperties() {
        return propertyService.getPropertiesByListingType("PG");
    }

    // ------------------------------------------------------------
    // Advanced Filters
    // ------------------------------------------------------------
    @GetMapping("/filter")
    public List<Property> filterProperties(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String listingType
    ) {
        return propertyService.filterProperties(city, type, listingType);
    }
}
