import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify"
import {useSelector} from "react-redux"
import { Spin } from 'antd'
import { getSlugProduct, updateProduct } from "../../../functions/product"
import AdminNav from "../../../component/nav/adminNav"
import UpdateProductForm from "../../../component/forms/updateProductForm"
import { getCategories, getCategorySubs } from "../../../functions/category"
import FileUpload from "../../../component/forms/fileUpload"



const initialState = {
    title: '',
    description: '',
    price: '',
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

const UpdateProduct = ({ match, history }) => {
    const [subOptions, setSubOptions] = useState([])
    const [updateSubs ,setUpdateSubs] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectCategoryUpdate, setSelectCategoryUpdate] = useState('')
    const [values, setValues] = useState(initialState)
    const {user} = useSelector((state) => ({...state}))
    let { slug } = match.params

    useEffect(() => {
       loadProduct()
        loadCategories()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        values.subs = updateSubs
        values.category = selectCategoryUpdate ? selectCategoryUpdate : values.category

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false)
                toast.success(`товар ${res.data.title} обновлен`)
                history.push('/admin/products')
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error(`Ошибка при обновлении товара ${err}`)
            })
        console.log('slug =>', slug, 'values product =>', values, 'user token', user.token)
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleChangeCategory = (e) => {
        e.preventDefault()
        console.log('Category selected', e.target.value)
        setValues({...values, subs: []})
        setSelectCategoryUpdate(e.target.value)
        getCategorySubs(e.target.value)
            .then(res => setSubOptions(res.data))
            .catch(err => console.log(`Error getting subcategories ${err}`))
        if(e.target.value === values.category){
            loadProduct()
        }

        setUpdateSubs([])
    }

    const loadProduct = () => {
        getSlugProduct(slug)
            .then((res) => {
                setValues({ ...values, ...res.data })
                getCategorySubs(res.data.category)
                    .then(res => setSubOptions(res.data))
                    .catch(err => console.log(`Error getting subcategories ${err}`))
                let arr = []
                res.data.subs.map((s) => {
                    arr = [...arr, s._id]
                    setUpdateSubs((prev) => arr)
                })
                console.log(arr)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const loadCategories = () => {
        getCategories().then((res) => {
            setCategories(res.data)
            console.log(res.data)
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md-10">
                    {
                        loading ? <Spin /> : <h4>Edit produc</h4>
                    }
                    <FileUpload
                        values={ values }
                        setValues={ setValues }
                        setLoading={ setLoading }
                    />
                    <hr/>
                   <UpdateProductForm
                   handleChange={ handleChange }
                   handleSubmit={ handleSubmit }
                   values={ values }
                   categories={ categories }
                   setValues={ setValues }
                   handleChangeCategory={ handleChangeCategory }
                   updateSubs={ updateSubs }
                   setUpdateSubs={ setUpdateSubs }
                   subOptions={ subOptions }
                   selectCategoryUpdate={ selectCategoryUpdate }
                   />
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct