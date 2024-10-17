package com.practice.bank.utility;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterationForm {
    private String username;
    private String password;
    private String email;
    private Long phone_number;
    private String type;
}
