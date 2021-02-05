import React, {useState, useEffect} from 'react';
import { auth } from '../../firebase'
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

const Register = ({ history }) => {
    const [email, setEmail] = useState('')
    const { user } = useSelector((state) => ({ ...state }))
    useEffect(() => {
        if (user && user.token) history.push('/')
    },[user])
    const handleSubmit = async (e) => {
     e.preventDefault()
     const config = {
         url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
         handleCodeInApp: true
     }

     await  auth.sendSignInLinkToEmail(email, config)
     toast.success(
         `Электронное письмо отправленно на ${email} проверьте вашу почту `
     )
        //Сохраняем почту в localStorage
     window.localStorage.setItem('emailForRegistration', email)
        //Чистим стейт email
        setEmail('')
    }
    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input type="email"
                       className="form-control"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       autoFocus
                       placeholder="Введите email"
                />
                <button type="submit" className="btn btn-raised btn-success my-2">
                    Регистрация
                </button>
            </form>
        )
    }
    return (
        <div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>Регистрация</h4>
                        {
                            registerForm()
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;