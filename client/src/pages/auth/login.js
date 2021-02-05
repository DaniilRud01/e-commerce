import React, { useEffect, useState } from 'react'
import { createOrUpdateUser } from '../../functions/auth'
import { Button, Spin } from 'antd'
import { GoogleOutlined, MailOutlined } from "@ant-design/icons"
import { auth, googleAuthProvider } from "../../firebase"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        let intended = history.location.state
        if(intended){
        } else {
            if (user && user.token) history.push('/')
        }
    },[user])

    const dispatch = useDispatch()
    let intended = history.location.state
    const roleBaseRedirect = (res) => {
        if (intended) {
            history.push(intended.from)
        } else {
            if (res.data.role === 'admin') {
                history.push('/admin/dashboard')
            } else {
                history.push('/user/history')
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const {user} = result
            const idToken = await user.getIdTokenResult()
            createOrUpdateUser(idToken.token)
                .then(res => {
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idToken.token,
                            role: res.data.role,
                            _id: res.data._id
                        }
                    })
                    roleBaseRedirect(res)
                })
                .catch(err => console.log("CREATE OR UPDATE ERROR", err))
            //history.push('/')
        } catch (e) {
            console.log(e)
            toast.error(e.message)
            setLoading(false)
        }
    }
    const googleLogin = async () => {
       auth.signInWithPopup(googleAuthProvider)
           .then(async (result) => {
               const { user } = result
               const idToken = await user.getIdTokenResult()
               createOrUpdateUser(idToken.token)
                   .then(res => {
                       dispatch({
                           type: 'LOGGED_IN_USER',
                           payload: {
                               name: res.data.name,
                               email: res.data.email,
                               token: idToken.token,
                               role: res.data.role,
                               _id: res.data._id
                           }
                       })
                       roleBaseRedirect(res)
                   })
                   .catch(err => console.log("CREATE OR UPDATE ERROR", err))
               history.push('/')
           })
           .catch(err => toast.error(err.message))
    }
    const LoginForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input type="email"
                       className="form-control"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       autoFocus
                       placeholder="Введите email"
                />
                <input type="password"
                       className="form-control mt-2 mb-3"
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       placeholder="Enter password"
                />
                <Button
                    onClick={handleSubmit}
                    type="primary"
                    block
                    shape="round"
                    icon={<MailOutlined/>}
                    size="large"
                    disabled={!email || password.length < 6}
                >
                    Войти
                </Button>
            </form>
        )
    }
    return (
        <div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {loading ?<h4 className="text-danger"><Spin/></h4> : <h4>Авторизация</h4> }
                        {
                            LoginForm()
                        }
                        <Button
                            onClick={googleLogin}
                            type="danger"
                            block
                            shape="round"
                            icon={<GoogleOutlined/>}
                            size="large"
                        >
                            Войти с помощью Google
                        </Button>
                        <Link to="/forgot/password" className="float-right text-danger mt-3">Восстановить пароль</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;