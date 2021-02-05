import React, { useState, useEffect } from 'react'
import { getCategory } from "../../functions/category"
import { Link } from 'react-router-dom'
import ProductCard from "../../component/card/ProductCard"
import {Spin} from "antd";

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const {slug} = match.params

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = () => {
        setLoading(true)
        getCategory(slug).then((res) => {
            setLoading(false)
            setCategory(res.data.category)
            setProduct(res.data.products)
            setLoading(false)
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {loading ? <Spin className="text-center mt-5 mb-5 display-4 p-3"/> :
                        <h4 className="text-center mt-5 mb-5 display-4 p-3 jumbotron"> {!product.length ? `Нет товаров в категории "${category.name}"` : `${product.length} товара в категории "${category.name}"`} </h4>}
                </div>
            </div>
            <div className="row">
                {product.map((p) => (
                    <div className="col-md-4" key={p._id}>
                        <ProductCard product={p}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryHome