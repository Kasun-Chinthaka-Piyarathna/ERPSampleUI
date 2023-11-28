import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

export const login = async (username, password) => {

    try {
        const res = await axios.post(API_URL + "signin", {
            username,
            password
        });
        const { data } = res;
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    } catch (error) {
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const register = async (
    firstName,
    lastName,
    username,
    phoneNumber,
    email,
    password,) => {
    try {
        const res = await axios.post(API_URL + "signup", {
            username,
            firstname: firstName,
            lastname: lastName,
            phonenumber: phoneNumber,
            email,
            password
        });
        const { data } = res;
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}
