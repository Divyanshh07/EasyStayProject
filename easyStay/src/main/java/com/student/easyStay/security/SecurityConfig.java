package com.student.easyStay.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())     // disable CSRF for REST
                .cors(Customizer.withDefaults())  // enable CORS
                .authorizeHttpRequests(auth -> auth

                        // ⭐ PUBLIC ROUTES
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/properties/**").permitAll()
                        .requestMatchers("/api/contact/send").permitAll()   // message sending is public

                        // ⭐ ADMIN ROUTES FOR CONTACT MESSAGES
                        .requestMatchers("/api/contact/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/admin/messages/**").hasRole("ADMIN")

                        // ⭐ SELLER ROUTES
                        .requestMatchers("/api/seller/**").hasRole("SELLER")

                        // ⭐ ANYTHING ELSE NEEDS LOGIN
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    // Password Encoder
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Authentication Manager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // CORS Configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();

        cors.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:3000",
                "https://your-production-domain.com"
        ));

        cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        cors.setAllowedHeaders(List.of("*"));
        cors.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }
}
