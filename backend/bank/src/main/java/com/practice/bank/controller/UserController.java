package com.practice.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.practice.bank.model.User;
import com.practice.bank.service.JwtService;
import com.practice.bank.service.UserService;
import com.practice.bank.utility.Credentials;
import com.practice.bank.utility.RegisterationForm;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE,RequestMethod.OPTIONS},allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("register")
    public ResponseEntity registerUser(@RequestBody RegisterationForm form) {
        try {
            User userFromDB = userService.register(form);
            return new ResponseEntity<>(userFromDB, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody Credentials user,HttpServletResponse response) {
        Authentication authentication = manager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            System.out.println(jwtService.generateToken(user.getUsername()));
            String token = jwtService.generateToken(user.getUsername());
            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            // cookie.setMaxAge(30000);
            cookie.setMaxAge(3600);
            cookie.setDomain("localhost");
            // cookie.set
            // cookie.setAttribute("SameSite", "Lax");
            // cookie.setSecure(false);
            response.addCookie(cookie);
            return ResponseEntity.ok(user.getUsername());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    public String deleteUser() {
        return "";
    }

    @PutMapping("/edit-user")
    public String modifyUser(@RequestBody RegisterationForm form) {
        return "";
    }

    @GetMapping("/user-details")
    public ResponseEntity getUserDetails(@RequestParam String username) {
        System.out.println(username);
        User user = userService.getUser(username);
        // System.out.println(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout-user")
    public ResponseEntity logoutUser(HttpServletResponse response){
        System.out.println("Reached logout method");
        Cookie cookie = new Cookie("token",null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("User Logged out");
    }
}
