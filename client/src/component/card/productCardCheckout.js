import React from 'react'
import {useDispatch} from "react-redux"
import ModalImage from 'react-modal-image'
import {toast} from "react-toastify"
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined} from '@ant-design/icons'

const ProductCardCheckout = ({p}) => {
    const color = ['Black', 'Brown', 'Silver', 'White', 'Blue']
    const dispatch = useDispatch()

    const handleColor = (e) => {
        let cart = []
        if (typeof window) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, idx) => {
                if (product._id === p._id) {
                    cart[idx].color = e.target.value
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }

    const handleQuantity = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value


        if (count > p.quantity) {
            toast.error(`Maximum amount, ${p.quantity}`)
        }

        let cart = []

        if (typeof window) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, idx) => {
                if (product._id === p._id) {
                    cart[idx].count = count
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    const handleRemove = () => {
        let cart = []

        if (typeof window) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product, idx) => {
                if (product._id === p._id) {
                    cart.splice(idx, 1)
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    return (
        <tbody>
        <tr>
            <td>
                <div style={{width: '100px', height: 'auto'}}>
                    {p.images.length ? <ModalImage small={p.images[0].url} large={p.images[0].url}/> : 'No photo'}
                </div>
            </td>
            <td>{p.title}</td>
            <td>${p.price}</td>
            <td>{p.brand}</td>
            <td>
                <select name="color" onChange={handleColor} className="form-control">
                    {p.color ? <option value={p.color}>{p.color}</option> : <option>Choose</option>}
                    {color.filter((c) => c !== p.color).map((c) => <option value={c} key={c}>{c}</option>)}
                </select>
            </td>
            <td className="text-center">
                <input type="number" value={p.count} className="form-control" onChange={handleQuantity}/>
            </td>
            <td className="text-center">
                {p.shipping === 'Yes' ? <CheckCircleOutlined className="text-success"/> :
                    <CloseCircleOutlined className="text-danger"/>}
            </td>
            <td className="text-center">
                <CloseOutlined onClick={handleRemove} className="text-danger pointer"/>
            </td>
        </tr>
        </tbody>
    )
}

export default ProductCardCheckout