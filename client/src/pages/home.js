import React from 'react'
import Jumbotron from "../component/card/jombotron"
import NewArrivals from "../component/home/newArrivals"
import BestSellers from "../component/home/bestsellers"
import CategoryList from '../component/category/categoryList'
import SubList from '../component/sub/subList'


const Home = () => {
    return (
        <>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron />
            </div>
            <h4 className="jumbotron display-4 text-center p-3 mt-5 mb-5">Newest</h4>
            <NewArrivals />
            <h4 className="jumbotron display-4 text-center p-3 mt-5 mb-5">Bestsellers</h4>
            <BestSellers />
            <h4 className="jumbotron display-4 text-center p-3 mt-5 mb-5">Subcategories</h4>
            <CategoryList />
            <h4 className="jumbotron display-4 text-center p-3 mt-5 mb-5">Categories</h4>
            <SubList />
        </>
    )
}

export default Home;