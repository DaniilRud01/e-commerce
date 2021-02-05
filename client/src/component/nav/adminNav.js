import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-link">Tools</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/product" className="nav-link">Add product</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/products" className="nav-link">Catalog</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/category" className="nav-link">Categories</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/sub" className="nav-link">Subcategories</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/coupon" className="nav-link">Coupons</Link>
                </li>
                <li className="nav-item">
                    <Link to="/user/password" className="nav-link">Пароль</Link>
                </li>
            </ul>
        </nav>
    )
}

export default AdminNav;