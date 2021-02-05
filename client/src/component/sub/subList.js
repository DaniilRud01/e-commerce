import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Spin } from 'antd'
import { getSubs } from "../../functions/sub"

const SubList = () => {
    const [subs, setSubs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getSubs().then((res) => {
            setSubs(res.data)
            setLoading(false)
        })
    }, [])

    const showSubs = () => subs.map((s) =>
        <Link to={`/sub/${s.slug}`} className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3 text-info col" key={s._id} > { s.name }</Link>
    )


    return (
        <div className="container">
            <div className="row">
                {
                    loading ? <Spin /> : showSubs()
                }
            </div>
        </div>
    )
}

export default SubList
