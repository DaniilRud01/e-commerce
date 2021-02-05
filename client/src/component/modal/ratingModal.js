import React, { useState } from 'react'
import { Modal, Button } from "antd"
import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import { StarOutlined } from "@ant-design/icons"
import { useHistory, useParams } from 'react-router-dom'

const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [ modalVisible, setModalVisible ] = useState(false)
    const history = useHistory()
    const { slug } = useParams()

    const handleModal = () => {
        if (user && user.token){
            setModalVisible(true)
        }else{
            history.push({
                pathname: '/login',
                state: { from: `/product/${slug}` }
            })
        }
    }
    return (
       <>
           <div onClick={handleModal}>
               <StarOutlined  className="text-danger"/> <br/>
               { user ? 'Rate' : 'Log in to evaluate the product' }
           </div>
           <Modal
            title="Поставить оценку"
            centered
            visible={ modalVisible }
            onOk={ () => {
                setModalVisible(false)
                toast.success('Thank you, your rating is accepted.')
            } }
            onCancel={ () => {
                setModalVisible(false)
            } }

           >
               { children }
           </Modal>
           </>
    )
}

export default RatingModal