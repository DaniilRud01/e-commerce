import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {getUserCart, emptyCartUser, saveAddress, appleCoupon} from "../functions/user"
import {toast} from "react-toastify"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const Checkout = ({history}) => {
    const dispatch = useDispatch()
    const {user, coupons} = useSelector((state) => ({...state}))
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [totalAfterDiscount, setTotalAfterDiscount] = useState('')
    const [discountError, setDiscountError] = useState('')

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            setProducts(res.data.products)
            setTotal(res.data.cartTotal)
        })
    }, [])

    const saveAddressDb = () => {
        saveAddress(address, user.token).then((res) => {
            if (res.data.ok) {
                setAddressSaved(true)
                toast.success('Адрес сохранен')
            }
        })
    }

    const emptyCart = () => {
        if (typeof window) {
            localStorage.removeItem('cart')
        }
        dispatch({
            type: 'ADD_TO_CART',
            payload: []
        })
        emptyCartUser(user.token).then((res) => {
            setProducts([])
            setTotal(0)
            setTotalAfterDiscount(0)
            setCoupon('')
            toast.success('Корзина очищена')

        })
    }


    const showAddress = () => {
        return (
            <>
                <ReactQuill theme="snow" value={address} onChange={setAddress}/>
                <button className="btn btn-primary mt-2" onClick={saveAddressDb}>Сохранить</button>
            </>
        )
    }

    const showProductSummary = () => {
        return products.map((p) => (
            <div key={p._id}>
                <p>{p.product.title} - ({p.color}) x {p.count} = {p.price * p.count}</p>
            </div>
        ))
    }

    const applyDiscountCoupon = () => {
        appleCoupon(coupon, user.token)
            .then((res) => {
                console.log('res coupon apply', res.data)
                if(res.data){
                    setTotalAfterDiscount(res.data)
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: true
                    })
                }
                if(res.data.err){
                    setDiscountError(res.data.err)
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: true
                    })
                }
            })
    }

    const showApplyCoupon = () => {
        return (
            <>
                <input
                    type="text"
                    value={coupon}
                    className="form-control"
                    onChange={(e) => setCoupon(e.target.value)}
                />
                <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Использовать</button>
            </>
        )
    }

    const clearDiscountError = () => {
         setTimeout(() => setDiscountError(''), 2000)
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Адрес доставки</h4>
                <br/>
                <br/>
                {showAddress()}
                <hr/>
                <h4>Есть купон ?</h4>
                <br/>
                <br/>
                {showApplyCoupon()}
                <br/>
                {discountError && <h4 className="bg-danger p-2">Купон не существует{clearDiscountError()}</h4>}
            </div>
            <div className="col-md-6">
                <h4>Сумма заказа</h4>
                <hr/>
                <p>количество товаров {products.length}</p>
                <hr/>
                {showProductSummary()}
                <hr/>
                <p>Итого: {total}</p>
                {totalAfterDiscount > 0 && (
                    <p className="bg-success p-2">Купон активирован, к оплате:  ${totalAfterDiscount}</p>
                )}
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary" disabled={!addressSaved} onClick={() => history.push('/payment')}>
                            Сделать заказ
                        </button>
                    </div>
                    <div className="col-md-6">
                        <p>Сумма скидки</p>
                        <button className="btn btn-primary"
                                onClick={emptyCart}
                                disabled={!products.length || !products.length}
                        >
                            Очистить корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout