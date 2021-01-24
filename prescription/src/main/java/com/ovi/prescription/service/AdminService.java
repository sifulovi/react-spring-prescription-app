package com.ovi.prescription.service;

import com.ovi.prescription.domain.Admin;
import com.ovi.prescription.exception.AdminEmailException;
import com.ovi.prescription.exception.LoginException;
import com.ovi.prescription.payload.request.RegistrationRequest;
import com.ovi.prescription.payload.response.AdminResponse;
import com.ovi.prescription.repository.AdminRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AdminService implements UserDetailsService {

    @Autowired
    AdminRepository adminRepository;
    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String email) {
        Admin adminEntity = adminRepository.findByEmail(email);
        if (adminEntity == null) {
            throw new LoginException(email);
        }
        return new User(adminEntity.getEmail(), adminEntity.getPassword(), new ArrayList<>());

    }

    public AdminResponse save(RegistrationRequest registrationRequest) throws AdminEmailException {
        if (adminRepository.existsByEmail(registrationRequest.getEmail())) {
            throw new AdminEmailException("User email is already exist");
        }
        Admin admin = new Admin();
        BeanUtils.copyProperties(registrationRequest, admin);
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin = adminRepository.save(admin);
        AdminResponse adminResponse = new AdminResponse();
        BeanUtils.copyProperties(admin, adminResponse);

        return adminResponse;
    }

    public AdminResponse getUserInfo(String email) throws AdminEmailException {
        AdminResponse adminResponse = new AdminResponse();
        Admin user = adminRepository.findByEmail(email);
        if (user ==null) throw new AdminEmailException("User not Found");
        BeanUtils.copyProperties(user, adminResponse);
        return adminResponse;
    }
}
