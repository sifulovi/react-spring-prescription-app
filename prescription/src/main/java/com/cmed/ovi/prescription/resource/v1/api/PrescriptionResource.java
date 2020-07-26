package com.cmed.ovi.prescription.resource.v1.api;

import com.cmed.ovi.prescription.domain.Prescription;
import com.cmed.ovi.prescription.exception.AdminEmailException;
import com.cmed.ovi.prescription.exception.PrescriptionException;
import com.cmed.ovi.prescription.payload.request.PrescriptionRequest;
import com.cmed.ovi.prescription.payload.response.AdminResponse;
import com.cmed.ovi.prescription.payload.response.PrescriptionResponse;
import com.cmed.ovi.prescription.service.PrescriptionService;
import com.cmed.ovi.prescription.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/prescription")
public class PrescriptionResource {

    @Autowired
    PrescriptionService prescriptionService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @GetMapping("/all")
    public List<PrescriptionResponse> list() {
        return prescriptionService.list();
    }

    @GetMapping
    public List<PrescriptionResponse> listByUserAdmin(@RequestParam String email) throws AdminEmailException {
        return prescriptionService.listByUserAdmin(email);
    }

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody PrescriptionRequest prescriptionRequest, BindingResult bindingResult) {

        ResponseEntity<?> errorMap = validationErrorService.mapValidationService(bindingResult);
        if (errorMap != null) return errorMap;
        PrescriptionResponse prescriptionResponse = prescriptionService.save(prescriptionRequest);
        return new ResponseEntity<>(prescriptionResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @Valid @RequestBody PrescriptionRequest prescriptionRequest, BindingResult bindingResult) throws PrescriptionException {

        ResponseEntity<?> errorMap = validationErrorService.mapValidationService(bindingResult);
        if (errorMap != null) return errorMap;
        PrescriptionResponse prescriptionResponse = prescriptionService.update(id, prescriptionRequest);
        return new ResponseEntity<>(prescriptionResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public PrescriptionResponse get(@PathVariable String id) throws PrescriptionException {
        return prescriptionService.get(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) throws PrescriptionException {
        return new ResponseEntity<>(prescriptionService.delete(id), HttpStatus.OK);
    }

    @GetMapping("/report")
    public List<PrescriptionResponse> report(@RequestParam String email, @RequestParam String prescriptionDate) throws AdminEmailException, ParseException {
        return prescriptionService.listByDateReport(email, prescriptionDate);
    }
}
