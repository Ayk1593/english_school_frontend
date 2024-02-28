import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import Homepage from "../../pages/Homepage/Homepage";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, pendingStatus, selectIsAuth} from "../../redux/slices/authSlice";
import Preloader from "../../components/Preloader/Preloader";
import Notfoundpage from "../../components/Notfoundpage/Notfoundpage";
import {ServerErrorPage} from "../../pages/ServerErrorPage/ServerErrorPage";


const PrivateRoute = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth);
    const statusPending = useSelector(pendingStatus)
    const authMeError = useSelector(state => state.auth.authMeError)

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])


    if (statusPending === 'loading') {
      return <Preloader />
    }
    if (authMeError) {
        return <ServerErrorPage />
    }

    return (
        (localStorage.token || isAuth)  ? <Outlet /> : <Homepage booleanModal={true}/>
    );
};

export default PrivateRoute;