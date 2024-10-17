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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.practice.bank.model.User;
import com.practice.bank.service.JwtService;
import com.practice.bank.service.UserService;
import com.practice.bank.utility.Credentials;
import com.practice.bank.utility.RegisterationForm;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
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
    public ResponseEntity loginUser(@RequestBody Credentials user) {
        Authentication authentication = manager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if(authentication.isAuthenticated()){
            System.out.println(jwtService.generateToken(user.getUsername()));
            return ResponseEntity.ok(jwtService.generateToken(user.getUsername()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    public String deleteUser() {
        return "";
    }

    public String modifyUser() {
        return "";
    }

    @GetMapping("/user")
    public User getUserDetails(@RequestParam String username){
        System.out.println(username);
        User user = userService.getUser(username);
       // System.out.println(user);
        return user;
    }
}