package com.practice.bank.service;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practice.bank.model.Account;
import com.practice.bank.model.User;
import com.practice.bank.repo.AccountRepo;
import com.practice.bank.repo.UserRepo;
import com.practice.bank.utility.AddMoneyDTO;
import com.practice.bank.utility.TransferMoneyDTO;

@Service
public class AccountService {
    
    @Autowired
    private AccountRepo accountRepo;
    @Autowired
    private UserRepo userRepo;

    // public Account()

    public Account createAcc(User user){
        User user1 = userRepo.findByEmail(user.getEmail());
        Account acc = new Account(0.0,"Savings");
        Account acc1 = user1.addAccount(acc);
        Account acc2 = accountRepo.save(acc1);
        System.out.println(acc2);
        return acc1;
    }

    public boolean addMoney(AddMoneyDTO addMoneyDTO){
        User user = userRepo.findByUsername(addMoneyDTO.getUsername());
        Account acc = user.getAcc();
        if(acc == null){
            return false; //Also can throw exception.
        }
        // double newAmount = acc.getBalance() + addMoneyDTO.getAmount();
        BigDecimal bd = new BigDecimal(acc.getBalance() + addMoneyDTO.getAmount());
        bd.setScale(2, RoundingMode.HALF_UP);
        acc.setBalance(bd.doubleValue());
        // user.setAcc(acc);
        User user1 = userRepo.save(user);
        Account updatedAcc = user1.getAcc();
        Account acc2 = accountRepo.save(updatedAcc);
        System.out.println("Updated Account");
        return true;
    }

    public boolean transferMoney(TransferMoneyDTO transferMoneyDTO) {
        User sender = userRepo.findByUsername(transferMoneyDTO.getUsername());
        if(sender == null){
            return false;
        }
        Account receiverAcc = accountRepo.findByAcc_no(transferMoneyDTO.getAcc_no());
        User receiver = userRepo.findById(receiverAcc.getUser().getId()); 
        if(receiver == null){
            return false;
        }
        //make transaction.
        //Sender account transaction
        sender.getAcc().setBalance(sender.getAcc().getBalance() - transferMoneyDTO.getAmount());
        User sender1 = userRepo.save(sender);
        accountRepo.save(sender1.getAcc());

        //reciever account transaction
        receiver.getAcc().setBalance(receiver.getAcc().getBalance() + transferMoneyDTO.getAmount());
        User receiver1 = userRepo.save(receiver);
        accountRepo.save(receiver1.getAcc());
        
        return true;
       }

}
