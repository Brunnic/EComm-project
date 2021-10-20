import { AnyAction } from "redux";
import { AUTH_ERROR, GET_USER, USER_LOGIN, USER_LOGOUT } from "../types";

const initialState = {
    user: {},
    loading: true,
    errors: [],
};

export interface AuthState {
    user: {
        id: number;
        fName: string;
        lName: string;
        email: string;
    };
    loading: boolean;
    errors: string[];
}

export default function auth(state = initialState, action: AnyAction) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOGIN:
            return {
                ...state,
                loading: false,
            };
        case GET_USER:
            return {
                ...state,
                user: payload,
                loading: false,
            };
        case AUTH_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false,
            };
        case USER_LOGOUT:
            return {
                ...state,
                user: {},
                loading: false,
            };
        default:
            return state;
    }
}
