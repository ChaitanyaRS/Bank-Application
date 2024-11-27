package com.practice.bank.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.practice.bank.model.Account;
import java.util.List;


@Repository
public interface AccountRepo extends JpaRepository<Account, Integer>{


    Account save(Account account);

    @Query(value="SELECT * FROM accounts WHERE acc_no=:acc_no",nativeQuery = true)
    Account findByAcc_no(@Param("acc_no")int acc_no);
    
} 