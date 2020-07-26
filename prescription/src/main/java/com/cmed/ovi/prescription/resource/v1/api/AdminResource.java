package com.cmed.ovi.prescription.resource.v1.api;

import com.cmed.ovi.prescription.config.jwt.JwtUtils;
import com.cmed.ovi.prescription.exception.AdminEmailException;
import com.cmed.ovi.prescription.payload.request.LoginRequest;
import com.cmed.ovi.prescription.payload.request.RegistrationRequest;
import com.cmed.ovi.prescription.payload.response.AdminResponse;
import com.cmed.ovi.prescription.payload.response.JWTLoginSuccessResponse;
import com.cmed.ovi.prescription.service.AdminService;
import com.cmed.ovi.prescription.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.cmed.ovi.prescription.config.jwt.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("api/v1/auth")
public class AdminResource {

    @Autowired
    private ValidationErrorService validationErrorService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtUtils tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateJwtToken(authentication);
        String email = ((User) authentication.getPrincipal()).getUsername();
        return ResponseEntity.ok(new JWTLoginSuccessResponse(email, true, jwt));
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@Valid @RequestBody RegistrationRequest registrationRequest, BindingResult bindingResult) throws AdminEmailException {
        ResponseEntity<?> errorMap = validationErrorService.mapValidationService(bindingResult);
        if (errorMap != null) return errorMap;
        AdminResponse adminResponse = adminService.save(registrationRequest);
        return new ResponseEntity<>(adminResponse, HttpStatus.CREATED);
    }

    @GetMapping("/info")
    public AdminResponse get(@RequestParam String email) throws AdminEmailException {
        return adminService.getUserInfo(email);
    }

    public void update() {
    }

    public void delete() {
    }

}
