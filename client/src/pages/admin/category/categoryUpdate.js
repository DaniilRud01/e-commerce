import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { updateCategory, getCategory } from "../../../functions/category"
import AdminNav from "../../../component/nav/adminNav"
import CategoryForm from "../../../component/forms/categoryFrom";

const CategoryUpdate = ({ history, match }) => {
    const [name, setName] = useState('')
    const {user} = useSelector((state) => ({...state}))
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      loadCategory()
    }, [])

    const loadCategory = () => {
        getCategory(match.params.slug).then((res) => setName(res.data.name))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateCategory(match.params.slug,{ name }, user.token)
            .then(res => {
                //console.log(res)
                setLoading(false)
                setName('')
                toast.success(`Category ${res.data.name} updated`)
                history.push('/admin/category')
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
                            <h4>Редактирова категорию</h4>
                    }
                    {
                        <CategoryForm handleSubmit={ handleSubmit } name={ name } setName={ setName }/>
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate;