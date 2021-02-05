import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Spin } from 'antd'
import {getCategories} from "../../functions/category"

const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getCategories().then((res) => {
            setCategories(res.data)
            setLoading(false)
        })
    }, [])

    const showCategories = () => categories.map((c) =>
       <Link to={`/category/${c.slug}`} className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3 text-info col" key={c._id} > { c.name }</Link>
    )


    return (
        <div className="container">
            <div className="row">
                {
                    loading ? <Spin /> : showCategories()
                }
            </div>
        </div>
    )
}

export default CategoryList
