import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { updateSub, getSub, removeSub } from "../../../functions/sub"
import AdminNav from "../../../component/nav/adminNav"
import CategoryForm from "../../../component/forms/categoryFrom"
import { getCategories } from "../../../functions/category"

const SubUpdate = ({ match, history }) => {
    const [name, setName] = useState('')
    const {user} = useSelector((state) => ({...state}))
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [parent, setParent] = useState('')


    useEffect(() => {
        loadCategories()
        loadSub()
    }, [])

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data))
    }
    const loadSub = () => {
        getSub(match.params.slug).then((res) => {
            setParent(res.data.parent)
            setName(res.data.name)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateSub(match.params.slug, { name, parent }, user.token)
            .then(res => {
                //console.log(res)
                setLoading(false)
                setName('')
                loadSub()
                toast.success(`Subcategory '${ res.data.name }' updated`)
                history.push('/admin/sub')
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
                            <h4 className="text-danger">Loaging...</h4>
                            :
                            <h4>Update subcategory</h4>
                    }
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={e => setParent(e.target.value)}>
                            <option value="">Choose category</option>
                            {
                                categories.length > 0 && categories.map((c) => (
                                    <option key={c._id} value={c._id} selected={c._id === parent}>
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
                </div>
            </div>
        </div>
    )
}

export default SubUpdate;