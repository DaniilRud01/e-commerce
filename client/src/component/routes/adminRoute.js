import React, {useEffect, useState} from 'react'
import {Route, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoadingToRedirect from './lodaingToRedirect'
import {currentAdmin} from '../../functions/auth'


const AdminRoute = ({children, ...res}) => {
    const {user} = useSelector((state) => ({...state}))
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then(res => {
                    console.log('Current admin response', res)
                    setOk(true)
                })
                .catch(err => {
                    console.log('current admin error response', err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ?
        <Route {...res} />
        : <LoadingToRedirect/>
}
export default AdminRoute