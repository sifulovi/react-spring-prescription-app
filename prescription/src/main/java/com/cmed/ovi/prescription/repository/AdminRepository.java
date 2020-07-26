package com.cmed.ovi.prescription.repository;

import com.cmed.ovi.prescription.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin findByEmail(String email);
    Admin findByAdminId(String adminId);
    Boolean existsByEmail(String email);

}
