import React, { useState, useEffect } from 'react'
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../card/showPaymentInfo"

const Orders = ({ orders, handleStatusChange }) => {
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
    return (
        <>
            {orders.map((order) => (
                <div key={order._id} className="row pb-5">
                    <div className="btn btn-block bg-light">
                        <ShowPaymentInfo order={order} showStatus={false}/>
                        <div className="row">
                            <div className="col-md-4">Delivery status</div>
                            <div className="col-md-8">
                                <select
                                    defaultValue={order.orderStatus}
                                    name="status"
                                    className="form-control"
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                                    <option value="Not Processed"> Not Processed</option>
                                    <option value="Processing"> Processing</option>
                                    <option value="Dispatched"> Dispatched</option>
                                    <option value="Canceled"> Canceled</option>
                                    <option value="Completed"> Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    { showOrderTable(order) }
                </div>
            ))}
        </>
    )
}

export default Orders;