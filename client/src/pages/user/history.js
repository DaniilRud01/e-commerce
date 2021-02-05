import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import UserNav from "../../component/nav/userNav"
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {getUserOrders} from '../../functions/user'
import {toast} from "react-toastify"
import {Spin} from 'antd'
import ShowPaymentInfo from '../../component/card/showPaymentInfo'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Invoice from '../../component/order/invoice'

const History = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => ({...state}))
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadUserOrders()
    }, [])

    const loadUserOrders = () => {
        setLoading(true)
        getUserOrders(user.token)
            .then((res) => {
                setLoading(false)
                setOrders(res.data)
            })
    }

    const showOrderTable = (order) => {
        return (
            <table className="table table-bordered">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Color</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Delivery</th>
                </tr>
                </thead>
                <tbody>
                {
                    order.products.map((el, idx) => (
                        <tr key={idx}>
                            <td>
                                <b>{el.product.title}</b>
                            </td>
                            <td>{el.product.price}</td>
                            <td>{el.product.brand}</td>
                            <td>{el.color}</td>
                            <td>{el.count}</td>
                            <td>{el.product.shipping === 'Да' ? <CheckCircleOutlined className="text-success"/> :
                                <CloseCircleOutlined className="text-danger"/>}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }

    const showDownloadLink = (order) => (
        <PDFDownloadLink document={
            <Invoice order={ order }/>
        }
                         fileName="invoice.pdf"
                         className="btn btn-sm btn-block btn-outline-primary">
            Скачать PDF
        </PDFDownloadLink>
    )

    const showEachOrders = () => {
        return orders.reverse().map((order, idx) => (
            <div key={idx} className="m-5 p-3 card">
                <ShowPaymentInfo order={order}/>
                {showOrderTable(order)}
                <div className="row">
                    <div className="col">
                        {
                            showDownloadLink(order)
                        }
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col text-center">
                    <h4>
                        {
                            orders.length ? "История покупок" : "Нет истории покупок"

                        }
                    </h4>
                    {showEachOrders()}
                </div>
            </div>
        </div>
    );
};

export default History;