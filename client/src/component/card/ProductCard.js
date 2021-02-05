import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { Card, Tooltip } from 'antd'
import noImage from '../../images/noimageavailable.png'
import { EyeOutlined, ShopOutlined } from "@ant-design/icons"
import {showAverage} from "../../functions/rating"
import lodash from 'lodash'

const { Meta } = Card

const ProductCard = ({ product }) => {
    let {title, description, images, slug, price} = product
    const dispatch = useDispatch()
    const { user, cart } = useState((state) => ({ ...state }))

    const [tooltip, setTooltip] = useState('Click for add')

    const handleAddToCart = () => {
        let cart = []
        if(typeof window){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                ...product,
                count: 1,
            })
            let unique = lodash.uniqWith(cart,lodash.isEqual)
            console.log('unique', unique)
            localStorage.setItem('cart', JSON.stringify(unique))

            dispatch({
                type: 'ADD_TO_CART',
                payload: unique
            })
            dispatch({
                type: 'SET_VISIBLE',
                payload: true
            })
        }
        setTooltip('Added')
    }


    return (
        <>
            {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className="text-center pt-1 pb-3">No rating</div>}
        <Card cover={
            <img src={images && images.length ? images[0].url : noImage} style={{height: '250px', ObjectFit: 'contain'}}
                 className="p-2"/>
        }
              actions={[
                  <Link to={`/product/${slug}`}>
                      <EyeOutlined className="text-info"/> <br/> Посмотреть товар
                  </Link>,
                  <Tooltip title={tooltip}>
                      <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                          <ShopOutlined className={`${product.quantity < 1 ? 'text-danger' : 'text-success'}`} /> <br/> { product.quantity < 1 ? 'Out in stock' : ' Add to cart' }
                      </a>
                  </Tooltip>
              ]}
        >
            <Meta title={`${title} - $${price}`} description={`${description && description.substring(0, 40)}...`}/>
        </Card>
            </>
    )
}
export default ProductCard