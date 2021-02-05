import React, { useState, useEffect } from 'react'
import { getSlugProduct, productStar, getRelated } from '../functions/product'
import SingleProduct from '../component/card/singleProduct'
import { useSelector } from "react-redux"
import ProductCard from "../component/card/ProductCard"

const Product = ({match}) => {
    const {user} = useSelector((state) => ({...state}))
    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0)
    const [related, setRelated] = useState([])
    const {slug} = match.params

    useEffect(() => {
        loadSlugProduct()
    }, [slug])


    useEffect(()=>{
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (el) => el.postedBy.toString() === user._id.toString()
            )
            existingRatingObject && setStar(existingRatingObject.star)
        }
    }, [])

    const onStarClick = (newRating, name) => {
        setStar(newRating)
        productStar(name, newRating, user.email, user.token)
            .then(res => {
                loadSlugProduct()
            })
    }

    const loadSlugProduct = () => {
        getSlugProduct(slug).then((res) => {
           setProduct(res.data)
               getRelated(res.data._id).then((res) => setRelated(res.data))
        })
    }

    return (
        <div className="container-fluid pt-6">
            <div className="row">
                <SingleProduct
                    product={product}
                    onStarClick={onStarClick}
                    star={star}
                />
            </div>
            <div className="row">
                <div className="col text-center py-5 pb-5">
                    <hr/>
                    <h1> Similar products</h1>
                    <hr/>
                </div>
            </div>
            <div className="row pb-5">
                {
                    related.length ? related.map((el) => (
                        <div key={el._id} className="col-md-4">
                            <ProductCard product={ el }/>
                        </div>
                    )) : <div className="text-center col"><h3>No related products</h3></div>
                }
            </div>
        </div>
    )
}

export default Product


