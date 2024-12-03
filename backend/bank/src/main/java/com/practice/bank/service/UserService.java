package com.practice.bank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.practice.bank.exception.EmailAlreadyExists;
import com.practice.bank.model.Account;
import com.practice.bank.model.User;
import com.practice.bank.repo.AccountRepo;
import com.practice.bank.repo.UserRepo;
import com.practice.bank.utility.RegisterationForm;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AccountRepo accountRepo;

    public User register(RegisterationForm form) {
        User userFromDB = userRepo.findByEmail(form.getEmail());
        if (userRepo.findByEmail(form.getEmail()) != null) {
            throw new EmailAlreadyExists("Email already exists.");
        } else {
            User user = userRepo.save(new User(form.getUsername(), encodedPassword(form.getPassword()), form.getEmail(),
                    form.getPhone_number()));
            User user1 = userRepo.findByEmail(form.getEmail());
            Account acc = new Account(0.0, form.getType());
            Account acc1 = user1.addAccount(acc);
            Account acc2 = accountRepo.save(acc1);
            return user1;
        }
    }

    public String encodedPassword(String password) {
        return new BCryptPasswordEncoder(12).encode(password);
    }

    public User getUser(String username) {
        return userRepo.findByUsername(username);
    }
}
