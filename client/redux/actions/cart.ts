import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    CART_ERROR,
    EDIT_CART,
} from "../types";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export interface ProductData {
    id: number;
    name: string;
    price: number;
}

export const addToCart =
    (data: ProductData) =>
    async (dispatch: ThunkDispatch<any, void, Action>) => {
        try {
            dispatch({
                type: ADD_TO_CART,
                payload: data,
            });
        } catch (err) {
            dispatch({
                type: CART_ERROR,
            });
        }
    };

export const editCart =
    (id: number, quantity: number) =>
    async (dispatch: ThunkDispatch<any, void, Action>) => {
        try {
            dispatch({
                type: EDIT_CART,
                payload: { id, quantity },
            });
        } catch (error) {
            dispatch({
                type: CART_ERROR,
            });
        }
    };

export const removeFromCart =
    (id: number) => async (dispatch: ThunkDispatch<any, void, Action>) => {
        try {
            dispatch({
                type: REMOVE_FROM_CART,
                payload: id,
            });
        } catch (error) {
            dispatch({
                type: CART_ERROR,
            });
        }
    };
