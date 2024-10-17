package com.practice.bank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.practice.bank.model.User;
import com.practice.bank.model.UserPrinciple;
import com.practice.bank.repo.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if(user ==null){
            throw new UsernameNotFoundException("No user with username "+username+" found");
        }
        return new UserPrinciple(user);
    }

}
