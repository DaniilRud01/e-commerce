import React, { useState, useEffect } from 'react'
import {getProductList, totalProducts} from "../../functions/product"
import ProductCard from '../../component/card/ProductCard'
import LoadCard from "../../component/card/loadCard"
import {Pagination} from "antd";

const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [totalProduct, setTotalProduct] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllProducts()
    }, [page])

    useEffect(() => {
        totalProducts().then(res => setTotalProduct(res.data))
    }, [])

    const getAllProducts = () => {
        setLoading(true)
        getProductList('sold', 'desc', page)
            .then((res) => {
                setLoading(false)
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <div className="container">
                {
                    loading ? <LoadCard count={3}/> : (
                        <div className="row">
                            {products.map((product) => (
                                <div className="col-md-4" key={product._id}>
                                    <ProductCard product={product}/>
                                </div>
                            ))}
                        </div>
                    )
                }
                <div className="row">
                    <div className="col-md-4 offset-md-4 text-center mt-4 pt-4 p-3">
                        <Pagination
                            current={ page }
                            total={ (totalProduct / 3) * 10 }
                            onChange={ (value) => setPage(value) }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BestSellers;