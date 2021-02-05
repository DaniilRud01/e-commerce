import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { createOrUpdateUser } from '../../functions/auth'


const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Валидация
        if (!email || !password){
            toast.error('Enter your password')
            return
        }
        if (password.length < 6){
            toast.error('Password must be at least 6 characters')
            return
        }


        try{
           const result = await auth.signInWithEmailLink(email, window.location.href)
            if(result.user.emailVerified){
                //удаляем почту из localStorage
                window.localStorage.removeItem('emailForRegistration')
                //получить id token пользователя
                let user = auth.currentUser
                await user.updatePassword(password)
                const idToken = await user.getIdTokenResult()
                //сохранить результат в redux

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
                    })
                    .catch(err => console.log("CREATE OR UPDATE ERROR", err))

                //редирекнуть пользователя
                history.push('/')
            }
        }catch (e){
            console.log(e)
            toast.error(e.message)
        }
    }
    const completeRegisterForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input type="email"
                       className="form-control px-2"
                       value={email}
                       disabled
                />
                <input type="password"
                       className="form-control px-2 my-2"
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       autoFocus
                       placeholder="Enter password"
                />
                <button type="submit" className="btn btn-raised btn-success my-2">
                   Complete registration
                </button>
            </form>
        )
    }
    return (
        <div>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h4>Завершение регистрации</h4>
                        {
                            completeRegisterForm()
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;