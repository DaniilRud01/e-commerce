import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify"
import { getOrders, changeStatus } from "../../functions/admin"
import AdminNav from "../../component/nav/adminNav"
import Orders from "../../component/order/orders";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([])
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadAllOrders()
    }, [])

    const loadAllOrders = () => {
        getOrders(user.token)
            .then((res) => {
                setOrders(res.data)
                console.log('orders response', res.data)
            })
    }

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token)
            .then((res) => {
                toast.success('Статус обновлен')
                loadAllOrders()
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                  <h4>Админка</h4>
                    <Orders orders={orders} handleStatusChange={handleStatusChange}/>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;