import React, {useEffect} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import Homepage from "../../pages/Homepage/Homepage";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, pendingStatus, selectIsAuth} from "../../redux/slices/authSlice";
import Preloader from "../../components/Preloader/Preloader";


const CmsPrivateRoute = () => {
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const dispatch = useDispatch()
    const statusPending = useSelector(pendingStatus)
    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])


    if (statusPending === 'loading') {
      return <Preloader />
    }

    return (
        (isAdmin)  ? <Outlet /> : <Homepage booleanModal={true}/>
    );
};

export default CmsPrivateRoute;