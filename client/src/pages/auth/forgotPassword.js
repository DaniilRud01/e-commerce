import React, { useState, useEffect } from 'react'
import { auth } from "../../firebase"
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { Spin } from "antd";

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        if (user && user.token) history.push('/')
    },[user])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }
        
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('')
                setLoading(false)
                toast.success('Проверьте вашу почту')
            })
            .catch((err) => {
                toast.error(err.message)
                setLoading(false)
            })
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {
                loading ? <Spin/> : <h4>Восстановить пароль</h4>
            }
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    autoFocus
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Введите ваш email"
                />
                <button
                    className="btn btn-raised btn-success mt-3"
                    disabled={!email}
                >
                    Восстановить пароль</button>
            </form>
        </div>
    )
}
export default ForgotPassword



