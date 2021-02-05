import React,{ useEffect, useState } from 'react'
import { getWishList, removeWishlist } from "../../functions/user"
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import UserNav from "../../component/nav/userNav"
import { DeleteOutlined } from '@ant-design/icons'


const WishList = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state }))
    const [wishList, setWishList] = useState([])

    useEffect(() => {
        loadWishList()
    }, [])

    const loadWishList = () => {
        getWishList(user.token)
            .then((res) => {
                setWishList(res.data.wishlist)
            })
    }

    const handleRemove = (productId) => {
        removeWishlist(productId, user.token)
            .then((res) => {
                loadWishList()
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h4>Избранное</h4>
                    {
                        wishList.map((p) => (
                            <div className="alert alert-secondary" key={p._id}>
                                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                                <span onClick={() => handleRemove(p._id)} className="btn btn-sm float-right">
                                <DeleteOutlined  className="text-danger"/>
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default WishList