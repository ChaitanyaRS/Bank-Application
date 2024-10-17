package com.practice.bank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practice.bank.model.Account;
import com.practice.bank.model.User;
import com.practice.bank.repo.AccountRepo;
import com.practice.bank.repo.UserRepo;

@Service
public class AccountService {
    
    @Autowired
    private AccountRepo accountRepo;
    @Autowired
    private UserRepo userRepo;

    public Account createAcc(User user){
        User user1 = userRepo.findByEmail(user.getEmail());
        Account acc = new Account(0.0,"Savings");
        Account acc1 = user1.addAccount(acc);
        Account acc2 = accountRepo.save(acc1);
        System.out.println(acc2);
        return acc1;
    }
}
