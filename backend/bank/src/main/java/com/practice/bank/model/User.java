package com.practice.bank.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    private String email;
    private Long phone_number;
    @OneToOne(mappedBy = "user",cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private Account acc;
    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<Transaction> transaction;

    public User(String username, String password, String email, Long phone_number){
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone_number = phone_number;
    }

    public User(String username, String password){
        this.username = username;
        this.password = password;
    }
    public Account addAccount(Account acc2) {
        this.setAcc(acc2);
        acc2.setUser(this);
        return acc2;
    } 
}

