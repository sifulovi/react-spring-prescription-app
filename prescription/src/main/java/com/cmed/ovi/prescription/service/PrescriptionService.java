package com.cmed.ovi.prescription.service;

import com.cmed.ovi.prescription.domain.Admin;
import com.cmed.ovi.prescription.domain.Prescription;
import com.cmed.ovi.prescription.exception.AdminEmailException;
import com.cmed.ovi.prescription.exception.PrescriptionException;
import com.cmed.ovi.prescription.payload.request.PrescriptionRequest;
import com.cmed.ovi.prescription.payload.response.AdminResponse;
import com.cmed.ovi.prescription.payload.response.MessageResponse;
import com.cmed.ovi.prescription.payload.response.PrescriptionResponse;
import com.cmed.ovi.prescription.repository.AdminRepository;
import com.cmed.ovi.prescription.repository.PrescriptionRepository;
import com.cmed.ovi.prescription.util.IdUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {

    @Autowired
    PrescriptionRepository prescriptionRepository;

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    IdUtils idUtils;

    public List<PrescriptionResponse> list() {
        List<PrescriptionResponse> prescriptionResponseList = new ArrayList<>();
        List<Prescription> prescriptionSourceList = prescriptionRepository.findAll();

        for (Prescription source : prescriptionSourceList) {
            PrescriptionResponse target = new PrescriptionResponse();
            BeanUtils.copyProperties(source, target);
            prescriptionResponseList.add(target);
        }

        return prescriptionResponseList;
    }

    public List<PrescriptionResponse> listByUserAdmin(String email) throws AdminEmailException {
        List<PrescriptionResponse> prescriptionResponseList = new ArrayList<>();
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null) throw new AdminEmailException("Admin Not Found");
        List<Prescription> prescriptionSourceList = prescriptionRepository.findAllByAdmin(admin);

        for (Prescription source : prescriptionSourceList) {
            PrescriptionResponse target = new PrescriptionResponse();
            BeanUtils.copyProperties(source, target);
            prescriptionResponseList.add(target);
        }

        return prescriptionResponseList;
    }

    public PrescriptionResponse save(PrescriptionRequest prescriptionRequest) {
        Prescription prescription = new Prescription();

        Admin admin = adminRepository.findByEmail(prescriptionRequest.getAdminId());

        BeanUtils.copyProperties(prescriptionRequest, prescription);

        prescription.setPrescriptionId(idUtils.generateID(5).toUpperCase());

        prescription.setAdmin(admin);

        prescription = prescriptionRepository.save(prescription);

        PrescriptionResponse response = new PrescriptionResponse();

        BeanUtils.copyProperties(prescription, response);

        return response;
    }


    public PrescriptionResponse update(String id, PrescriptionRequest prescriptionRequest) throws PrescriptionException {

        Prescription prescription1 = prescriptionRepository.findByPrescriptionId(id);
        if (prescription1 == null) {
            throw new PrescriptionException("Prescription not found");
        }
        BeanUtils.copyProperties(prescriptionRequest, prescription1);
        prescription1 = prescriptionRepository.save(prescription1);
        PrescriptionResponse response = new PrescriptionResponse();
        BeanUtils.copyProperties(prescription1, response);

        return response;
    }

    public PrescriptionResponse get(String id) throws PrescriptionException {
        PrescriptionResponse prescriptionResponse = new PrescriptionResponse();
        Prescription prescription = prescriptionRepository.findByPrescriptionId(id);
        if (prescription == null) {
            throw new PrescriptionException("Prescription not found");
        }
        BeanUtils.copyProperties(prescription, prescriptionResponse);
        return prescriptionResponse;
    }

    public MessageResponse delete(String id) throws PrescriptionException {
        Prescription prescription = prescriptionRepository.findByPrescriptionId(id);
        if (prescription == null) {
            throw new PrescriptionException("Prescription not found");
        }
        else {
            prescriptionRepository.delete(prescription);
            return new MessageResponse("prescription with Id : " + prescription.getPrescriptionId() + "is deleted");
        }
    }

    public List<PrescriptionResponse> listByDateReport(String email, String prescriptionDate) throws AdminEmailException, ParseException {
        List<PrescriptionResponse> prescriptionResponseList = new ArrayList<>();
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null) throw new AdminEmailException("Admin Not Found");
        List<Prescription> prescriptionSourceList = prescriptionRepository.findAllByPrescriptionDate(
                new SimpleDateFormat("yyyy-MM-dd").parse(prescriptionDate)
        );

        for (Prescription source : prescriptionSourceList) {
            PrescriptionResponse target = new PrescriptionResponse();
            BeanUtils.copyProperties(source, target);
            prescriptionResponseList.add(target);
        }

        return prescriptionResponseList;
    }
}
