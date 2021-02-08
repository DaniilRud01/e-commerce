import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getCountProduct } from "../../../functions/product"
import AdminNav from "../../../component/nav/adminNav"
import AdminProductCard from "../../../component/card/adminProductCard"
import { removeProduct } from '../../../functions/product'

const AllProducts = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadingAllProducts()
    }, [])

    const loadingAllProducts = () => {
        setLoading(true)
        getCountProduct(40)
            .then((res) => {
                setLoading(false)
                setProducts(res.data)
            })
            .catch((err) =>{
                setLoading(false)
                console.log(err)
            })
    }

    const handleRemoveProduct = (slug) => {
      if(window.confirm('Удалить ?')){
          removeProduct(slug, user.token)
              .then((res) => {
                  loadingAllProducts()
                  toast.error(`Товар ${res.data.title} удалён`)
              })
              .catch((err) => {
                  if(err.response.status === 400){
                      toast.error(err.response.data)
                  }
              })
      }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {
                        loading ? <Spin /> : <h4>All products</h4>
                    }
                    <div className="row">
                        {
                            products.map((product) => (
                                <div className="col-md-4" key={ product.id }>
                                    <AdminProductCard product={ product } handleRemoveProduct={ handleRemoveProduct }/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts;