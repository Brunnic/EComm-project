import { AnyAction } from "redux";
import { CART_ERROR, CLEAR_CART, ADD_TO_CART, REMOVE_FROM_CART } from "../types";

import { ProductData } from "../actions/cart";

const initialState: CartState = {
    items: [],
    loading: true,
    error: false,
}

interface ItemData extends ProductData {
    quantity: number;
}

export interface CartState {
    items: ItemData[];
    loading: boolean;
    error: boolean;
}

export default function cart(state = initialState, action: AnyAction) {
    const { type, payload } = action;

    switch(type) {
        case ADD_TO_CART:
            return {
                ...state,
                items: (state.items.length > 0) ? (
                    state.items.filter((i: ItemData) => i.id === payload.id).length > 0 ? state.items.map((i: ItemData) => {
                        if(i.id === payload.id) {
                            i.quantity++;
                        }
                        return i;
                    }) : [...state.items, {...payload, quantity: 1}]
                ) : [{...payload, quantity: 1}],
            }
        default:
            return state;
    }
}