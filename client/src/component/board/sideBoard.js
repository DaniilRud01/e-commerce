import React from 'react'
import {Drawer, Button} from 'antd'
import {useDispatch, useSelector} from "react-redux"
import {Link} from 'react-router-dom'

const SideBoard = () => {
    const dispatch = useDispatch()
    const {board, cart} = useSelector((state) => ({...state}))

    const imageStyle = {
        width: '100%',
        height: '100px',
        ObjectFit: 'cover'
    }

    return (
        <Drawer
            className="text-center"
            title={`Корзина / ${cart.length} товара`}
            onClose={() => {
                dispatch({
                    type: 'SET_VISIBLE',
                    payload: false
                })
            }} visible={board}>
            {
                cart.map((p) => (
                    <div className="row" key={p._id}>
                        <div className="col">
                            {
                                p.images[0] ?
                                    <>
                                        <img src={p.images[0].url} alt="" style={imageStyle}/>
                                        <p className="pt-1 pb-1 text-center bg-secondary text-light">
                                            {p.title} x {p.count}
                                        </p>
                                    </> :
                                    <>
                                        No photo
                                        <p className="pt-1 pb-1 text-center bg-secondary text-light">{p.title} x {p.count}</p>
                                    </>
                            }
                        </div>
                    </div>
                ))
            }
            <Link to='/cart'>
                <Button onClick={() => {
                    dispatch({
                        type: "SET_VISIBLE",
                        payload: false
                    })
                }} className="text-center btn btn-primary btn-raised btn-block">
                  Go to cart
                </Button>

            </Link>
        </Drawer>
    )
}

export default SideBoard