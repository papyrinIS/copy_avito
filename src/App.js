import React from 'react';
import './App.scss';
import {Routers} from "./pages/Routers";
import {useDispatch, useSelector} from "react-redux";
import {AuthActions} from "./redux/auth/AuthActions";
import {Header} from "./components/header/Header";

function App() {
    const {message} = useSelector(state => {
        return {
            message: state.AuthReducer.message
        }
    })
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (message) {
            setTimeout(() => dispatch(AuthActions.messageApiAC('')), 6000)
        }
    }, [message, dispatch])

    React.useEffect(() => {
        const storageName = 'userData';
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            dispatch(AuthActions.isAuthAC(data))
        }
    }, [dispatch])


    return (
        <div className="App">
            <Header/>
            <Routers/>
        </div>
    );
}

export default App;
