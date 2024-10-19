import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../api/userApi';

const UserDetails = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user);
    console.log(user);

    // useEffect(async () => {
    //     const response = await dispatch(getUserData());
    //     if(response.)
    //     return () => {
    //         second
    //     }
    // }, [third])

    return (
        <div>
            Users Data
        </div>
    )
}

export default UserDetails
