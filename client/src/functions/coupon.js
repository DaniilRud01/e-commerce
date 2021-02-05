import axios from 'axios'

export const getCoupons = async() => {
    return await axios.get(`${process.env.REACT_APP_API}/coupons`)
}

export const removeCoupon = async(coupondId, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/coupon/${coupondId}`, {headers:{authtoken}})
}

export const CreateCoupon = async(coupon, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/coupon`, {coupon}, {headers:{authtoken}})
}