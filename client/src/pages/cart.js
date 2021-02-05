import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import ProductCardCheckout from '../component/card/productCardCheckout'
import {toast} from "react-toastify"
import { userCart } from '../functions/user'

const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()

    const getTotal = () => {
        return cart.reduce((acc,rec) => {
            return acc + rec.count * rec.price
        }, 0)
    }

    const showCartItems = () => {
           return (
               <table className="table table-bordered">
                   <thead className="thead-light">
                   <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Color</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Delivery</th>
                        <th scope="col">Delete</th>
                   </tr>
                   </thead>
                   {
                       cart.map((p) => (
                          <ProductCardCheckout  key={p._id} p={p}/>
                       ))
                   }
               </table>
           )
    }

    const saveDb = () => {
        toast.info('Ваш заказ сохранен')
        userCart(cart, user.token)
            .then((res) => {
                if(res.data.ok){
                    history.push('/checkout')
                }
            }).catch(err => console.log('cart save', err))
    }

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-8">
                    <h4>Корзина / {cart.length} Товара</h4>
                    {!cart.length ? <p>Корзина пустая</p>:showCartItems()}
                </div>
                <div className="col-md-4">
                    <h4>Сумма заказа</h4>
                    <hr/>
                    <p>Товары</p>
                    { cart.map((c,idx) =>
                        <div key={idx}>
                           <p>
                               {c.title} x {c.count} = ${c.price * c.count}
                           </p>
                        </div>
                    ) }
                    <hr/>
                    Сумма: <b>${getTotal()}</b>
                    <hr/>
                    {
                        user ? (
                            <>
                                <button
                                    onClick={saveDb}
                                    disabled={!cart.length}
                                    className="btn btn-small btn-primary mt-2"
                                >
                                    Оформить заказ
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-small btn-primary mt-2">
                                <Link to={{
                                    pathname:'/login',
                                    state: {from: 'cart'}
                                }}>Войти чтобы Оформить заказ</Link>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart