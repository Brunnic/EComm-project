import axios from "../../util/axios";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import {
    AUTH_ERROR,
    GET_USER,
    USER_LOGIN,
    USER_LOGOUT,
    USER_REGISTER,
} from "../types";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    fName: string;
    lName: string;
    email: string;
    password: string;
}

export const login =
    (data: LoginData, next: () => void) =>
    async (dispatch: ThunkDispatch<any, void, Action>) => {
        try {
            const res = await axios.post<any>("/api/auth/login", data);
            dispatch({
                type: USER_LOGIN,
            });
            next();
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data,
            });
        }
    };

export const getUser =
    () => async (dispatch: ThunkDispatch<any, void, Action>) => {
        try {
            const res = await axios.get("/api/user");
            dispatch({
                type: GET_USER,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data,
            });
        }
    };

export const logout =
    () => async (dispatch: ThunkDispatch<any, void, Action>) => {
        try {
            const res = await axios.get("/api/auth/logout");
            dispatch({
                type: USER_LOGOUT,
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data,
            });
        }
    };

export const register =
    (data: RegisterData, next: () => void) =>
    async (dispatch: ThunkDispatch<any, void, Action>) => {
        try {
            const res = await axios.post("/api/auth/register", data);
            dispatch({
                type: USER_REGISTER,
            });
            next();
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data,
            });
        }
    };
