import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {AuthReducer} from "./auth/AuthReducer";
import {ProfileReducer} from "./profile/ProfileReducer";


const RootReducer=combineReducers({
    AuthReducer,
ProfileReducer
})

const store=createStore(RootReducer,applyMiddleware(thunk))

window.store=store

export default store