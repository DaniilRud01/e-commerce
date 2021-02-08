import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import noImage from '../../images/noimageavailable.png'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"


const { Meta } = Card


const AdminProductCard = ({ product, handleRemoveProduct }) => {
    let {title, description, images, slug} = product

    return (
        <Card cover={
            <img src={ images && images.length ? images[0].url : noImage } style={{ height: '250px', ObjectFit: 'contain' }}
                 className="p-2"/>
        }
              actions={[
                  <Link to={`/admin/product/${ slug }`}>
                      <EditOutlined className="text-warning"/>
                  </Link>,
                  <DeleteOutlined className="text-danger"
                                  onClick={ () => handleRemoveProduct(slug) }
                  />]}
        >
            <Meta title={title} description={`${ description && description.substring(0, 40) }...`}/>
        </Card>
    )
}
export default AdminProductCard



