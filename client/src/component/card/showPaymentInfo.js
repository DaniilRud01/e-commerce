import React from 'react'

const ShowPaymentInfo = ({ order, showStatus = true })  => {
    return (
        <div>
           <p>Номер заказа: { order.paymentIntent.id }</p>
           <p>К оплате: { (order.paymentIntent.amount /=100).toLocaleString('en-US', {
               style: 'currency',
               currency: "USD"
           })}</p>
            <p>Валюта: { order.paymentIntent.currency.toUpperCase() }</p>
            <p>Способ оплаты: { order.paymentIntent.payment_method_types[0] }</p>
            <p>Оплата: { order.paymentIntent.status.toUpperCase() }</p>
            <p>Заказано: { new Date(order.paymentIntent.created * 1000).toLocaleString() }</p>
            {
             showStatus &&  (
                 <span className="mb-3 badge bg-primary text-white">Order status: {order.orderStatus}</span>
             )
            }        </div>
    )
}

export default ShowPaymentInfo