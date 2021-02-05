import React, {useState, useEffect} from 'react'
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import {createCategory, getCategories, removeCategory} from "../../../functions/category"
import AdminNav from "../../../component/nav/adminNav"
import {Link} from "react-router-dom"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from "../../../component/forms/categoryFrom"

const CategoryCreate = () => {
    const [name, setName] = useState('')
    const {user} = useSelector((state) => ({...state}))
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')
    const filterCategory = categories.filter(el => el.name.toLowerCase().includes(search))


    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data))
    }

    const handleRemove = async (slug) => {
       if( window.confirm('Удалить категорию ?')){
           setLoading(true)
           removeCategory(slug, user.token)
               .then(res => {
                   setLoading(false)
                   loadCategories()
                   toast.error(`Category ${res.data.name} deleted`)
               })
               .catch(err => {
                   setLoading(false)
                   if (err.response.status === 400) {
                       toast.error(err.response.data)
                   }
               })
       }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCategory({name}, user.token)
            .then(res => {
                //console.log(res)
                setLoading(false)
                setName('')
                loadCategories()
                toast.success(`Category ${res.data.name} added`)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.status === 400) {
                    toast.error(err.response.data)
                }
            })

    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Загрузка...</h4> : <h4>Добавить категорию</h4>}
                   <CategoryForm handleSubmit={ handleSubmit } name={ name } setName={ setName }/>
                    <input
                        type="search"
                        placeholder="Поиск"
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        className="form-control mb-4"
                    />
                    {
                        filterCategory.map((category) => (
                            <div className="alert alert-primary" key={category._id}>
                                {category.name}
                                <span onClick={() => handleRemove(category.slug)} className="btn btn-sm float-right">
                                    <DeleteOutlined className="text-danger"/>
                                </span>
                                <Link to={`/admin/category/${category.slug}`}>
                                     <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning"/>
                                </span>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate;