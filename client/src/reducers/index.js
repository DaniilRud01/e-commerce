import { combineReducers } from "redux"
import { userReducer } from './userReducer'
import { searchReducer } from './searchReducer'
import { cartReducer } from "./cartReducer"
import { boardReducer } from './boardReducer'
import { couponReducer } from './couponReducer'

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    board: boardReducer,
    coupon: couponReducer
})
export default rootReducer