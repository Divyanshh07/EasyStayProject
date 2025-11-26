package com.student.easyStay.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Details
    private String title;
    private String type;
    private String listingType; // Buy / Rent / PG
    private String city;
    private String locality;
    private String fullAddress;

    // Pricing
    private double price;
    private double securityDeposit;

    // Thumbnail
    private String imageUrl;

    // Image Gallery
    @ElementCollection
    private List<String> imageGallery;

    // Description & Amenities
    @Column(length = 2000)
    private String description;

    @ElementCollection
    private List<String> amenities;

    // Seller Info
    private String sellerName;
    private String sellerPhone;
    private String sellerEmail;

    // Location
    private String locationUrl;
    private double latitude;
    private double longitude;

    // Status
    private boolean available = true;
    private String status = "Available";

    // Time
    private LocalDateTime postedAt = LocalDateTime.now();

    public Property() {}

    // --------------------- GETTERS & SETTERS ---------------------

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getListingType() {
        return listingType;
    }
    public void setListingType(String listingType) {
        this.listingType = listingType;
    }

    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    public String getLocality() {
        return locality;
    }
    public void setLocality(String locality) {
        this.locality = locality;
    }

    public String getFullAddress() {
        return fullAddress;
    }
    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public double getSecurityDeposit() {
        return securityDeposit;
    }
    public void setSecurityDeposit(double securityDeposit) {
        this.securityDeposit = securityDeposit;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getImageGallery() {
        return imageGallery;
    }
    public void setImageGallery(List<String> imageGallery) {
        this.imageGallery = imageGallery;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getAmenities() {
        return amenities;
    }
    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public String getSellerName() {
        return sellerName;
    }
    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getSellerPhone() {
        return sellerPhone;
    }
    public void setSellerPhone(String sellerPhone) {
        this.sellerPhone = sellerPhone;
    }

    public String getSellerEmail() {
        return sellerEmail;
    }
    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

    public String getLocationUrl() {
        return locationUrl;
    }
    public void setLocationUrl(String locationUrl) {
        this.locationUrl = locationUrl;
    }

    public double getLatitude() {
        return latitude;
    }
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public boolean isAvailable() {
        return available;
    }
    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getPostedAt() {
        return postedAt;
    }
    public void setPostedAt(LocalDateTime postedAt) {
        this.postedAt = postedAt;
    }
}
