import React, { useState } from 'react'
import UserNav from "../../component/nav/userNav"
import { auth } from "../../firebase"
import { toast } from "react-toastify"

const UpdatePassword = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false)
                setPassword('')
                toast.success('Password updated')
            })
            .catch(err => {
                setLoading(false)
                toast.error('Ошибка при обновление пароля', err)
            })

    }


    const passwordUpdateFrom = () => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Your password</label>
                <input type="password"
                       onChange={e => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter new password"
                       disabled={loading}
                       value={password}
                />
                <button className="btn btn-success"
                        disabled={!password || password.length < 6 || loading}>Обновить</button>
            </div>
        </form>
    )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    { loading ? <h4 className="text-danger">Обновления пароля...</h4> : <h4 className="text-success">Смена пароля</h4>}
                    {passwordUpdateFrom()}
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;