import axios from "axios";

const API_SERVER = "http://localhost:8080"

export default class UserActions {

    static registerUser(payload) {
        return axios({
            url: `${API_SERVER}/api/v1/auth/registration`,
            method: "POST",
            data: payload
        });
    }

    static loginUser(payload) {
        return axios({
            url: `${API_SERVER}/api/v1/auth/login`,
            method: "POST",
            data: payload,
        });
    }

    static logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
    }

    static createPrescription(payload) {
        payload = {
            ...payload,
            adminId: this.getEmail()
        }
        return axios({
            url: `${API_SERVER}/api/v1/prescription`,
            method: "POST",
            data: payload,
            headers: {
                Authorization: this.getToken()
            }
        });
    }

    static updatePrescription(id, payload) {
        payload = {
            ...payload,
            adminId: this.getEmail()
        }
        return axios({
            url: `${API_SERVER}/api/v1/prescription/${id}`,
            method: "PUT",
            data: payload,
            headers: {
                Authorization: this.getToken()
            }
        });
    }

    static getPrescriptions() {
        return axios({
            url: `${API_SERVER}/api/v1/prescription`,
            method: "GET",
            params: {email: this.getEmail()},
            headers: {
                Authorization: this.getToken()
            },
        });
    }

    static getPrescriptionsByDate(payload) {
        return axios({
            url: `${API_SERVER}/api/v1/prescription/report`,
            method: "GET",
            params: {email: this.getEmail(), prescriptionDate: payload.prescriptionDate},
            headers: {
                Authorization: this.getToken()
            },
        });
    }

    static deletePrescriptions(id) {
        return axios({
            url: `${API_SERVER}/api/v1/prescription/${id}`,
            method: "DELETE",
            headers: {
                Authorization: this.getToken()
            },
        });
    }

    static getPrescription(id) {
        return axios({
            url: `${API_SERVER}/api/v1/prescription/${id}`,
            method: "GET",
            headers: {
                Authorization: this.getToken()
            },
        });
    }

    static isAuthenticated() {
        let user = sessionStorage.getItem("token");
        return !!user;
    }

    static getToken() {
        return sessionStorage.getItem("token")
    }

    static getEmail() {
        return sessionStorage.getItem("email")
    }
}
