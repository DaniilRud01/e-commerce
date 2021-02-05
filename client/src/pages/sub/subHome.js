import React, { useState, useEffect } from 'react'
import { getSub } from "../../functions/sub"
import ProductCard from "../../component/card/ProductCard"
import {Spin} from "antd"

const SubHome = ({ match }) => {
    const [sub, setSub] = useState([])
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const {slug} = match.params
    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = () => {
        setLoading(true)
        getSub(slug).then((res) => {
            setLoading(false)
            setSub(res.data.subs)
            setProduct(res.data.products)
            setLoading(false)
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {loading ? <Spin className="text-center mt-5 mb-5 display-4 p-3"/> :
                        <h4 className="text-center mt-5 mb-5 display-4 p-3 jumbotron"> {!product.length ? `Нет товаров в категории "${sub.name}"` : `${product.length} товара в категории "${sub.name}"`} </h4>}
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

export default SubHome