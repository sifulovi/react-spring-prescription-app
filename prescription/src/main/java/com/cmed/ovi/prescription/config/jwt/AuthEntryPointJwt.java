package com.cmed.ovi.prescription.config.jwt;

import com.cmed.ovi.prescription.exception.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

	private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

	private ObjectMapper mapper;

	StringHttpMessageConverter messageConverter;

	public AuthEntryPointJwt() {
		this.mapper = new ObjectMapper();
		this.messageConverter = new StringHttpMessageConverter();
	}

	public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException {
		ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
		apiError.setMessage(e.getMessage());
		apiError.setDebugMessage(e.getMessage());
		ServerHttpResponse outputMessage = new ServletServerHttpResponse(httpServletResponse);
		outputMessage.setStatusCode(HttpStatus.UNAUTHORIZED);

		messageConverter.write(mapper.writeValueAsString(apiError), MediaType.APPLICATION_JSON, outputMessage);
	}

}