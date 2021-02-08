import React, {useState} from 'react'
import { Menu, Badge } from 'antd'
import {
    AppstoreOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import firebase from "firebase"
import Search from '../forms/search'

const {SubMenu, Item} = Menu


const Header = () => {
    const [current, setCurrent] = useState('home')
    const dispatch = useDispatch()
    const { user, cart } = useSelector((state) => ({...state}))
    const history = useHistory()
    const handleClick = (e) => {
        setCurrent(e.key)
    }
    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        history.push('/login')
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined/>}>
                <Link to='/'>Home</Link>
            </Item>
            <Item key="shop" icon={<ShoppingOutlined/>}>
                <Link to='/'>Shop</Link>
            </Item>
            <Item key="cart" icon={<ShoppingCartOutlined/>}>
                <Link to='/'>
                <Badge count={cart.length} offset={[9,0]}>
                    Cart
                </Badge>
                </Link>
            </Item>
            {
                !user && (
                    <Item key="register" icon={<UserAddOutlined/>} className="float-right">
                        <Link to='/register'>Register</Link>
                    </Item>
                )
            }

            {
                !user && (
                    <Item key="login" icon={<UserOutlined/>} className="float-right">
                        <Link to='/login'>Log in</Link>
                    </Item>
                )
            }

            {
                user && (
                    <SubMenu key="SubMenu"
                             icon={<SettingOutlined/>}
                             title={user.email && user.name}
                             className="float-right"
                    >
                        {
                            user && user.role === 'subscriber' &&
                            <Item>
                                <Link to="/user/history">Tools</Link>
                            </Item>
                        }
                        {
                            user && user.role === 'admin' &&
                            <Item>
                                <Link to="/admin/dashboard">Tools</Link>
                            </Item>
                        }
                        <Item icon={<LogoutOutlined/>} onClick={logout}>Log out</Item>
                    </SubMenu>
                )
            }
            <span className="float-right p-1">
                <Search />
            </span>
        </Menu>
    );
};

export default Header