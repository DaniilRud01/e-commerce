import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import DatePicker from 'react-datepicker'
import {getCoupons, removeCoupon, CreateCoupon} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css"
import {DeleteOutlined} from '@ant-design/icons'
import AdminNav from "../../../component/nav/adminNav"
import {Spin} from "antd";

const CreateCouponPage = () => {
    const {user} = useSelector((state) => ({...state}))
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState('')
    const [loading, setLoading] = useState(false)
    const [coupons, setCoupons] = useState([])

    useEffect(() => {
        loadAllCoupons()
    }, [])


    const loadAllCoupons = () => {
        getCoupons(user.token).then((res) => setCoupons(res.data))
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        CreateCoupon({ name, expiry,discount }, user.token)
            .then((res) => {
                setLoading(false)
                loadAllCoupons()
                setName('')
                setDiscount('')
                setExpiry('')
                toast.success(`${res.data.name} Добавлен`)
            }).catch((err) => console.log(err))

    }

    const handleRemove = (couponId) => {
        setLoading(true)
        if (window.confirm('Удалить')){
            removeCoupon(couponId, user.token)
                .then((res) => {
                    setLoading(false)
                    loadAllCoupons()
                    toast.error(`Купон ${res.data.name} удален`)
                }).catch(err => console.log(err))
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                    {
                        loading ? <Spin /> : <h4>Добавить купон</h4>
                    }

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Скидка %</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-muted mr-2">Срок</label>
                            <br/>
                          <DatePicker
                              className="form-control"
                              selected={new Date()}
                              value={expiry}
                              onChange={(date) => setExpiry(date)}
                              required
                          />
                        </div>
                        <button className="btn btn-outline-primary">Сохранить</button>
                    </form>
                    <br/>
                    <h4>{ coupons.length } Купон</h4>

                    <table className="table table-bordered">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">
                                Название
                            </th>
                            <th scope="col">
                                Срок действия
                            </th>
                            <th scope="col">
                                Скидка
                            </th>
                            <th scope="col">
                                Действие
                            </th>
                        </tr>
                        </thead>
                        <tbody className="thead-light">
                        {coupons.map((c, idx) => (
                            <tr key={idx}>
                                <td scope="col">
                                    {c.name}
                                </td>
                                <td scope="col">
                                    {new Date(c.expiry).toLocaleDateString()}
                                </td>
                                <td scope="col">
                                    {`${c.discount}%`}
                                </td>
                                <td scope="col">
                                    <DeleteOutlined
                                        onClick={() => handleRemove(c._id)}
                                        className="text-danger pointer"
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage