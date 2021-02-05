import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from "react-redux"
import { Avatar, Badge } from "antd"

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }))

    const handleRemoveImage = (public_id) => {
        setLoading(true)
        console.log(public_id)
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authtoken: user.token
            }
        })
            .then(res => {
                setLoading(false)
                let { images } = values
                const filterImage = images.filter((image) => {
                    return image.public_id !== public_id
                })
                setValues({ ...values, images: filterImage })
                console.log(res)

            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    const uploadedImages = values.images
    const resizeAndUpload = (e) => {
        setLoading(true)
       //resize
        let files = e.target.files
        if(files) {
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (res) => {
                   axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: res }, {
                       headers: {
                           authtoken: user.token
                       }
                   })
                       .then(res => {
                           console.log('UPLOAD SUCCESS', res)
                           uploadedImages.push(res.data)
                           setLoading(false)
                           setValues({ ...values, images: uploadedImages })
                       })
                       .catch(err => {
                           console.log('UPLOAD ERROR =>', err)
                       })
                }, 'base64')
            }
        }
    }
    return (
        <div>
            <label className="btn btn-outline-info mt-3 mb-3">
                Выбрать фото
                <input
                    type="file"
                    hidden
                    onChange={ resizeAndUpload }
                    multiple
                    accept="image/*"
                />
            </label>
            <div className="row m-6">
                {
                    values.images && values.images.map((image) => (
                        <Badge
                            key={image.public_id}
                            count='X'
                            style={{cursor:'pointer'}}
                            onClick={() => handleRemoveImage(image.public_id)}
                        >
                           <Avatar
                               key={image.public_id}
                               src={image.url}
                               size={120}
                               shape="square"
                               className="m-3"
                           />
                        </Badge>

                    ))
                }
            </div>
        </div>
    );
};

export default FileUpload;