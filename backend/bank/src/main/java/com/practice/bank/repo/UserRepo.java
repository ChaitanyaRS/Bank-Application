package com.practice.bank.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practice.bank.model.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer>{

    User findByEmail(String email);

    User findByUsername(String username);

    User findById(int id);

}
