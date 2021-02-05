import React, {useState, useEffect} from 'react'
import {toast} from "react-toastify"
import { useSelector } from "react-redux"
import { Spin } from 'antd'
import { createProduct } from "../../../functions/product"
import AdminNav from "../../../component/nav/adminNav"
import ProductCreateForm from "../../../component/forms/productCreateForm"
import { getCategories, getCategorySubs } from "../../../functions/category"
import FileUpload from "../../../component/forms/fileUpload"


const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Черный', 'Коричневый', 'Серебро', 'Белый', 'Синий'],
    brands: ['Apple', 'Lenovo', 'Toshiba', 'Microsoft', 'Asus'],
    color: '',
    brand: ''
}

const ProductCreate = () => {
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [subShow, setSubShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        getCategories().then((res) => setValues({ ...values, categories: res.data }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(values, user.token)
            .then(res => {
                console.log(res)
                window.alert(`товар ${res.data.title} добавлен`)
                window.location.reload()
            })
            .catch(err => {
               toast.error(err.response.data.err)
            })
    }
    const handleChange = (e) => {
     setValues({...values, [e.target.name]: e.target.value})
    }

    const handleChangeCategory = (e) => {
        e.preventDefault()
        console.log('Category selected', e.target.value)
        setValues({...values, subs: [], category: e.target.value})
        getCategorySubs(e.target.value)
            .then(res => setSubOptions(res.data))
            .catch(err => console.log(`Error getting sub categories ${err}`))
        setSubShow(true)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                    { loading ? <Spin className="mt-3" /> : <h4> добавить товар </h4>}
                    <FileUpload
                        values={ values }
                        setValues={ setValues }
                        setLoading={ setLoading }
                    />
                    <ProductCreateForm
                        handleSubmit={ handleSubmit }
                        handleChange={ handleChange }
                        values={ values }
                        setValues={ setValues }
                        handleChangeCategory={ handleChangeCategory }
                        subOptions={ subOptions }
                        subShow={ subShow }

                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate