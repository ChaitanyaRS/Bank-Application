package com.practice.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.practice.bank.model.Account;
import com.practice.bank.service.AccountService;
import com.practice.bank.utility.AddMoneyDTO;
import com.practice.bank.utility.TransferMoneyDTO;

import io.micrometer.core.ipc.http.HttpSender.Response;

@RestController
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE,RequestMethod.OPTIONS},allowedHeaders = "*")
public class AccountController {

    @Autowired
    public AccountService accountService;    

    @PostMapping("/add-money")
    public ResponseEntity addMoney(@RequestBody AddMoneyDTO addMoneyDTO){
        Boolean status = accountService.addMoney(addMoneyDTO);
        if(status == false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request");
        }
        return ResponseEntity.ok("Money Added");
    }

    @PostMapping("/transfer-money")
    public ResponseEntity transferMoney(@RequestBody TransferMoneyDTO transferMoneyDTO){
        boolean status = accountService.transferMoney(transferMoneyDTO);
        if(status == true){
            return ResponseEntity.ok("Transfer Complete");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transfer failed");
        }
    }
}
