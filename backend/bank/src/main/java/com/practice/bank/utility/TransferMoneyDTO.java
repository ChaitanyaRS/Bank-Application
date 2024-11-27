package com.practice.bank.utility;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferMoneyDTO {
    private String username;
    private int acc_no;
    private double amount;
}
