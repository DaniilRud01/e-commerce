import React, {useEffect, useState} from 'react'
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {useSelector, useDispatch} from "react-redux"
import {createPayment} from '../functions/stripe'
import { Link } from 'react-router-dom'
import { createOrder, emptyCartUser } from '../functions/user'

import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'

const StripeCheckout = ({history}) => {
    const dispatch = useDispatch()
    const { user, coupon } = useSelector((state) => ({...state}))
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')

    const [cartTotal, setCartTotal] = useState(0)
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [payable, setPayable] = useState(0)

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        createPayment(user.token, coupon)
            .then((res) => {
                console.log('create payment', res.data)
                setClientSecret(res.data.clientSecret)
                setCartTotal(res.data.cartTotal)
                setTotalAfterDiscount(res.data.totalAfterDiscount)
                setPayable(res.data.payable)
            })
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value
                }
            },
        })

        if(payload.error){
            setError(`Оплата не прошла ${payload.error.message}`)
            setProcessing(false)
        }else{
            createOrder(payload, user.token)
                .then((res) => {
                    if(res.data.ok){
                      if(typeof  window){
                          localStorage.removeItem('cart')
                          dispatch({
                            type: 'ADD_TO_CART',
                              payload: []
                          })
                          dispatch({
                              type: 'COUPON_APPLIED',
                              payload: false
                          })
                          emptyCartUser(user.token)
                      }
                    }
                })
            setError(null)
            setProcessing(false)
            setSuccess(true)
        }

    }

    const handleChange = async (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error : '')
    }

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            }
        }
    }

    return (
        <div>
            {
                !success && <> { coupon && totalAfterDiscount !== undefined ? (
                   <p className="alert alert-success"> {`Сумма после скидки ${totalAfterDiscount}`} </p>
                ) :
                    (<p className="alert alert-danger">No coupons activated</p>)} </>
            }
            <div className="text-center pb-5">
                <Card
                    actions={[
                        <>
                        <DollarOutlined className="text-info"/>
                        <br/>
                        Total:${cartTotal}
                        </>,
                        <>
                        <CheckOutlined className="text-info" />
                        <br/>
                          To pay: ${(payable / 100).toFixed(2)}
                        </>
                    ]}
                />
            </div>
            <form onSubmit={handleSubmit} id="payment-form" className="stripe-form">
                <CardElement
                    id='card-element'
                    options={cartStyle}
                    onChange={handleChange}
                />
                <button
                    className="stripe-button"
                    disabled={processing || disabled || success}>
                        <span id="button-text">
                            {processing ? <div className="spinner" id="spinner" />: 'Pay'}
                        </span>
                </button>
                <br/>
                { error && <div className="card-error" role="alert">{error}</div> }
                <br/>
                {
                    success &&
                    <p className={success ? 'Result' : 'Hidden message'}>
                      The payment was successful.
                        <br/>
                        <Link to="/user/history">View purchase history</Link>
                    </p>
                }
            </form>
        </div>
    )
}

export default StripeCheckout