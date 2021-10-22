import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";
import { AuthState } from "./reducers/auth";
import { CartState } from "./reducers/cart";

const initialState = {};

export interface RootState {
    auth: AuthState;
    cart: CartState;
}

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
