import React, { useEffect, lazy, Suspense} from 'react'
import { Switch, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"

import { currentUser } from './functions/auth'
import { auth } from './firebase'
import { useDispatch } from "react-redux"
import {LoadingOutlined} from "@ant-design/icons"

// import Login from './pages/auth/login'
// import Register from './pages/auth/register'
// import Home from "./pages/home"
// import Header from "./component/nav/header"
// import RegisterComplete from './pages/auth/registerComplete'
// import ForgotPassword from "./pages/auth/forgotPassword"
// import History from './pages/user/history'
// import UserRoute from './component/routes/userRoute'
// import AdminRoute from './component/routes/adminRoute'
// import UpdatePassword from "./pages/user/updatePassword"
// import WishList from "./pages/user/wishList"
// import AdminDashboard from "./pages/admin/adminDashboard"
// import CategoryCreate from "./pages/admin/category/categoryCreate"
// import CategoryUpdate from "./pages/admin/category/categoryUpdate"
// import SubCreate from "./pages/admin/sub/subCreate"
// import SubUpdate from "./pages/admin/sub/subUpdate"
// import ProductCreate from "./pages/admin/product/productCtreate"
// import AllProducts from "./pages/admin/product/allProducts"
// import UpdateProduct from "./pages/admin/product/updateProduct"
// import Product from './pages/product'
// import CategoryHome from './pages/category/categoryHome'
// import SubHome from "./pages/sub/subHome"
// import Shop from "./pages/shop"
// import Cart from "./pages/cart"
// import SideBoard from "./component/board/sideBoard"
// import Checkout from "./pages/checkout"
// import CreateCouponPage from './pages/admin/coupons/CreateCouponPage'
// import Payment from './pages/payment'


//при помощи lazy

const Login = lazy(() => import('./pages/auth/login'))
const Register = lazy(() => import('./pages/auth/register'))
const Home = lazy(() => import( "./pages/home"))
const Header = lazy(() => import("./component/nav/header"))
const RegisterComplete = lazy(() => import('./pages/auth/registerComplete'))
const ForgotPassword = lazy(() => import("./pages/auth/forgotPassword"))
const History = lazy(() => import('./pages/user/history'))
const UserRoute = lazy(() => import('./component/routes/userRoute'))
const AdminRoute = lazy(() => import('./component/routes/adminRoute'))
const UpdatePassword = lazy(() => import("./pages/user/updatePassword"))
const WishList = lazy(() => import("./pages/user/wishList"))
const AdminDashboard = lazy(() => import("./pages/admin/adminDashboard"))
const CategoryCreate = lazy(() => import("./pages/admin/category/categoryCreate"))
const CategoryUpdate = lazy(() => import("./pages/admin/category/categoryUpdate"))
const SubCreate = lazy(() => import("./pages/admin/sub/subCreate"))
const SubUpdate = lazy(() => import("./pages/admin/sub/subUpdate"))
const ProductCreate = lazy(() => import("./pages/admin/product/productCtreate"))
const AllProducts = lazy(() => import("./pages/admin/product/allProducts"))
const UpdateProduct = lazy(() => import("./pages/admin/product/updateProduct"))
const Product = lazy(() => import('./pages/product'))
const CategoryHome = lazy(() => import('./pages/category/categoryHome'))
const SubHome = lazy(() => import("./pages/sub/subHome"))
const Shop = lazy(() => import("./pages/shop"))
const Cart = lazy(() => import("./pages/cart"))
const SideBoard = lazy(() => import("./component/board/sideBoard"))
const Checkout = lazy(() => import("./pages/checkout"))
const CreateCouponPage = lazy(() => import('./pages/admin/coupons/CreateCouponPage'))
const Payment = lazy(() => import('./pages/payment'))

const App = () => {
    const dispatch = useDispatch()
    //Проверяем авторизацию в firebase
    useEffect(() => {
        //Получить зарегистрированного пользователя
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if(user){
                const idToken = await user.getIdTokenResult()

                currentUser(idToken.token)
                    .then(res => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idToken.token,
                                role: res.data.role,
                                _id: res.data._id
                            }
                        })
                    })
                    .catch(err => console.log(err))
            }
            return unsubscribe()
        })
    },[])
 return (
    <Suspense fallback={
        <div className="col text-center p-5">
            <LoadingOutlined />
        </div>
    }>
        <Header />
        <SideBoard />
        <ToastContainer />
        <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/login' component={ Login } />
            <Route exact path='/register' component={ Register } />
            <Route exact path='/register/complete' component={ RegisterComplete } />
            <Route exact path='/forgot/password' component={ ForgotPassword } />
            <UserRoute exact path='/user/history' component={ History } />
            <UserRoute exact path='/user/password' component={ UpdatePassword } />
            <UserRoute exact path='/user/wishlist' component={ WishList } />
            <AdminRoute exact path='/admin/dashboard' component={ AdminDashboard } />
            <AdminRoute exact path='/admin/category' component={ CategoryCreate } />
            <AdminRoute exact path='/admin/category/:slug' component={ CategoryUpdate } />
            <AdminRoute exact path='/admin/category/:slug' component={ CategoryUpdate } />
            <AdminRoute exact path='/admin/sub' component={ SubCreate } />
            <AdminRoute exact path='/admin/sub/:slug' component={ SubUpdate } />
            <AdminRoute exact path='/admin/product' component={ ProductCreate } />
            <AdminRoute exact path='/admin/products' component={ AllProducts } />
            <AdminRoute exact path='/admin/product/:slug' component={ UpdateProduct } />
            <AdminRoute exact path='/admin/coupon' component={ CreateCouponPage } />
            <Route exact path='/product/:slug' component={ Product } />
            <Route exact path='/category/:slug' component={ CategoryHome } />
            <Route exact path='/sub/:slug' component={ SubHome } />
            <Route exact path='/shop' component={ Shop } />
            <Route exact path='/cart' component={ Cart } />
            <UserRoute exact path='/checkout' component={ Checkout } />
            <UserRoute exact path='/payment' component={ Payment } />
        </Switch>
    </Suspense>
 )
}

export default App
