package com.student.easyStay.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret; // Must be at least 32 chars for HS256

    // Create signing key
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Generate JWT Token (email + role)
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // 24 hrs
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract Email (subject)
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    // Extract Role
    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    // Validate JWT Token
    public boolean validateToken(String token) {
        try {
            getClaims(token); // If parsing works, token is valid
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("JWT ERROR: Token expired");
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT ERROR: Unsupported token");
        } catch (MalformedJwtException e) {
            System.out.println("JWT ERROR: Invalid token");
        } catch (SecurityException e) {
            System.out.println("JWT ERROR: Signature mismatch");
        } catch (IllegalArgumentException e) {
            System.out.println("JWT ERROR: Empty or null token");
        }
        return false;
    }

    // Get all claims safely
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
