import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Card, Tabs, Tooltip } from "antd"
import { HeartOutlined, ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import ProductListItems from "./productListItems"
import StarRating from "react-star-ratings"
import RatingModal from '../modal/ratingModal'
import { showAverage } from '../../functions/rating'
import { addToWishList } from "../../functions/user"
import { useHistory } from 'react-router-dom'
import lodash from "lodash"
import {toast} from "react-toastify"

const {TabPane} = Tabs

const SingleProduct = ({product, onStarClick, star}) => {
    const {title, images, description, _id} = product
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()
    const [tooltip, setTooltip] = useState('Click for add')
    const history = useHistory()


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
        }
        setTooltip('Added')

    }


    const handleAddToWishlist = (e) => {
        e.preventDefault()
        addToWishList(product._id, user.token)
            .then((res) => {
                console.log('added to wishlist', res.data)
                toast.success('Added to favorites')
                history.push('/user/wishlist')
            })
    }

    return (
        <>
            <div className="col-md-7">
                <Carousel showArrows autoPlay infiniteLoop>
                    {
                        images && images.map((i) => <img src={i.url} key={i.public_id} alt=""/>)
                    }
                </Carousel>
                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description}
                    </TabPane>
                    <TabPane tab="Description" key="2">
                        Подробное описание товара которые конечно же отсутствует
                    </TabPane>
                </Tabs>
                <br/>
            </div>
            <div className="col-md-5">
                <h1 className="py-4 px-4 bg-secondary text-white">{title}</h1>
                {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className="text-center pt-1 pb-3">Нет рейтинга</div>}
                <Card actions={[
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart}>
                            <ShopOutlined className="text-success"/> <br/> Add to cart
                        </a>
                    </Tooltip>,
                    <a onClick={handleAddToWishlist}>
                        <HeartOutlined className="text-danger"/> <br/> Add to favorite
                    </a>,
                    <RatingModal>
                        <StarRating
                            name={_id}
                            numberOfStars={5}
                            rating={star}
                            isSelectable={true}
                            starRatedColor="red"
                            changeRating={onStarClick}
                        />
                    </RatingModal>
                ]}>
                    <ProductListItems product={product}/>
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;