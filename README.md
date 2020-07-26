# React-spring-prescription-app

###TECHONOLOGY USED:

For Backend:
 1. Spring Boot /JPA /Security
 2. JWT for Token
 3. MYSQL for Database
 
For Front-end:
 1. React.js
 2. Material UI for react

###DataBase Configure:
```
spring.datasource.username=root
spring.datasource.password=
spring.datasource.url=jdbc:mysql://localhost:3306/prescription?serverTimezone=UTC

## Hibernate Properties
# The SQL dialect makes Hibernate generate better SQL for the chosen database
#spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Hibernate ddl auto (create, create-drop, validate, update)
spring.jpa.hibernate.ddl-auto = update
spring.jpa.show-sql=true

#For JWT
ovi.app.jwtSecret= OviSecretKey
ovi.app.jwtExpirationMs= 86400000

```
After Start spring boot app CommandRunner will automatic generates couple of User , Prescription.
Explore **DbLoader.java** more to know :D .

### API's

Token format :
```
 Authorization :  Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwuY29tIiwiaWF0IjoxNTk1NzgyNDQ4LCJleHAiOjE1OTU4Njg4NDh9.Wv3mK6q3DapwWLwIWq1qYa8W4TLo8TaLW9-v4BxNfLdxh9SsoYMEscqnzBX-xfiBrery_dq4yLQwsrM9LJhjKg
```

For Admin Registration
```
POST : http://localhost:8080/api/v1/auth/registration
payload : {
  fullName: '',
  password: '',
  email: ''
}
```
For Admin Login
```
POST : http://localhost:8080/api/v1/auth/login
payload : {
  password: '',
  email: ''
} && And token 
```
For Admin Prescription activities:


```
POST : http://localhost:8080api/v1/prescription
payload : {
  prescriptionDate: '',
  patientName: '',
   patientAge: '',
   patientGender: 'MALE',
   diagnosis: '',
   medicines: '',
   nextVisitDate: '',
   adminId : your login email
} && And token 
```

```
PUT : http://localhost:8080/api/v1/prescription/${id}
payload : {
  prescriptionDate: '',
  patientName: '',
   patientAge: '',
   patientGender: 'MALE',
   diagnosis: '',
   medicines: '',
   nextVisitDate: '',
   adminId : your login email
} && And token 
```

```
GET : http://localhost:8080/api/v1/prescription
params: {
email :  "your login email"
}
 && And token 
```

```
GET : http://localhost:8080/api/v1/prescription/report
params: {
email :  "your login email",
prescriptionDate: ''
}
 && And token 
```
```
DELETE : http://localhost:8080/api/v1/prescription/${id}
 && And token 
```
```
GET : http://localhost:8080/api/v1/prescription/${id}
 && And token 
```

