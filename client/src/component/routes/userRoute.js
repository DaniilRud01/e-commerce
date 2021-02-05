import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './lodaingToRedirect'


const UserRoute = ({children, ...res}) => {
    const { user } = useSelector((state) => ({ ...state }))

    return user && user.token ?
        <Route { ...res } />
        : <LoadingToRedirect/>
}
export default UserRoute