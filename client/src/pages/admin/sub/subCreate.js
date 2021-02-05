import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { createSub, getSubs, removeSub } from "../../../functions/sub"
import AdminNav from "../../../component/nav/adminNav"
import CategoryForm from "../../../component/forms/categoryFrom"
import { getCategories } from "../../../functions/category"

const SubCreate = () => {
    const [name, setName] = useState('')
    const {user} = useSelector((state) => ({...state}))
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const SearchSub = subs.filter(el => el.name.toLowerCase().includes(search))
    // const filteredSub = subs.filter(el => el._id === category )
    // console.log(filteredSub)


    useEffect(() => {
        loadCategories()
        loadSubs()
    }, [])

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data))
    }
    const loadSubs = () => {
        getSubs().then((res) => setSubs(res.data))
    }

    const handleRemove = async (slug) => {
        if( window.confirm('Delete Subcategory?')){
            setLoading(true)
            removeSub(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.error(`Subcategory ${res.data.name} deleted`)
                    loadSubs()
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
        createSub({ name, parent: category }, user.token)
            .then(res => {
                //console.log(res)
                setLoading(false)
                setName('')
                loadSubs()
                toast.success(`Category ${ res.data.name } added`)
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
                    {
                        loading ?
                            <h4 className="text-danger">Загрузка...</h4>
                            :
                            <h4>Добавить подкатегорию</h4>
                    }
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={e => setCategory(e.target.value)}>
                            <option value="">Выберите категорию</option>
                            {
                                categories.length > 0 && categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <CategoryForm
                        handleSubmit={ handleSubmit }
                        name={ name }
                        setName={ setName }/>
                    <input
                        type="search"
                        placeholder="Поиск"
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        className="form-control mb-4"
                    />
                    {
                        SearchSub.map((sub) => (
                            <div className="alert alert-primary" key={sub._id}>
                                {sub.name}
                                <span onClick={() => handleRemove(sub.slug)} className="btn btn-sm float-right">
                                    <DeleteOutlined className="text-danger"/>
                                </span>
                                <Link to={`/admin/sub/${sub.slug}`}>
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

export default SubCreate;