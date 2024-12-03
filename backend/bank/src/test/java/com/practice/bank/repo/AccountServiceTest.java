package com.practice.bank.repo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.practice.bank.model.Account;
import com.practice.bank.model.User;
import com.practice.bank.service.AccountService;
import com.practice.bank.service.UserService;
import com.practice.bank.utility.RegisterationForm;

// @ExtendWith(MockitoExtension.class)
public class AccountServiceTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private AccountRepo accountRepo;

    @InjectMocks
    private UserService userService;

    public AccountServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void duplicateAccTest() {
        RegisterationForm user = new RegisterationForm("Chaitanya", "Chaitanya@123", "chaitanya@test.com", 123456677L,
                "Savings");

        User userFromDB = new User(user.getUsername(), "**********", user.getEmail(), user.getPhone_number());

        when(userRepo.findByEmail(user.getEmail())).thenReturn(userFromDB);
        // when(userService.register(user3)).thenReturn(user4);

        // Test Method
        User returnedUser = userService.register(user);

        assertEquals(returnedUser, userFromDB);

        verify(userRepo, never()).save(any(User.class));
    }

    @Test
    void registerUserTest() {
        RegisterationForm user = new RegisterationForm("Chaitanya", "Chaitanya@123", "chaitanya@test.com", 123456677L,
                "Savings");

        User savedUser = new User(user.getUsername(), "*********", user.getEmail(), user.getPhone_number());

        Account newAcc = new Account(10,"Savings");

        when(userRepo.findByEmail(user.getEmail())).thenReturn(null);
        when(userRepo.save(new User(user.getEmail(),user.getPassword()))).thenReturn(savedUser);
        when(userRepo.findByEmail(user.getEmail())).thenReturn(savedUser);
        when(accountRepo.save(any(Account.class))).thenReturn(newAcc);

        User returnedUser = userService.register(user);

        assertNotNull(returnedUser);
        assertEquals(returnedUser, savedUser);
        assertEquals(returnedUser.getEmail(), savedUser.getEmail());

        // verify(userRepo, times(2)).findByEmail(user.getEmail());
        verify(userRepo, times(2)).findByEmail(user.getEmail());
    }
}
