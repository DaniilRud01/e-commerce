import React, { useState, useEffect } from 'react'
import { getCountProduct } from "../functions/product"
import { getCategories } from "../functions/category"
import { getSubs } from "../functions/sub"
import { useSelector, useDispatch } from "react-redux"
import ProductCard from "../component/card/ProductCard"
import { fetchProductsByFilter } from '../functions/product'
import { Spin } from "antd"
import { Menu, Slider, Checkbox, Radio } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'
import Star from '../component/forms/star'


const Shop = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState('')
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState(false)
    const [categoryIds, setCategoryIds] = useState([])
    const [star, setStar] = useState('')
    const [brands, setBrands] = useState( ['Apple', 'Lenovo', 'Toshiba', 'Microsoft', 'Asus'])
    const [brand, setBrand] = useState('')
    const [colors, setColors] = useState(['Черный', 'Коричневый', 'Серебро', 'Белый', 'Синий'])
    const [color, setColor] = useState('')
    const [shipping, setShipping] = useState('')

    const { SubMenu } = Menu
    const dispatch = useDispatch()
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search

    useEffect(() => {
        loadAllProducts()
        loadCategories()
        loadSubsCategory()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getCountProduct(12).then((res) => setProducts(res.data))
        setLoading(false)
    }

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data))
    }

    const loadSubsCategory = () => {
        getSubs().then((res) => setSubs(res.data))
    }

    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text })
            if(!text){
                loadAllProducts()
            }
        }, 300)
        return () => clearTimeout(delayed)
    }, [text])

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data)
        })
    }

    useEffect(() => {
        fetchProducts({ price })
    }, [ok])

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setCategoryIds([])
        setPrice(value)
        setStar('')
        setSub('')
        setBrand('')
        setShipping('')
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0,0])
        setStar('')
        setSub('')
        setBrand('')
        setColor('')
        setShipping('')
      const idInState = [...categoryIds]
      const checkedId = e.target.value
      const searchIdInTheState = idInState.indexOf(checkedId)

     if(searchIdInTheState === -1){
     idInState.push(checkedId)
     }else{
         idInState.splice(searchIdInTheState, 1)
     }

     setCategoryIds(idInState)
    fetchProducts({ category: idInState  })
    }

    const showCategories = () => categories.map((c) =>
            <div key={ c._id }>
        <Checkbox
            onChange={ handleCheck }
            className="pb-2 pl-4 pr-4"
            name={ c.name }
            value={ c._id }
            checked={ categoryIds.includes(c._id) }
        >
            { c.name }
        </Checkbox>
        <br/>
    </div>
    )

    const handleStarClick = (num) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar(num)
        setSub('')
        setColor('')
        setShipping('')
        fetchProducts({ stars: num })
    }

    const showProductStarRating = () => (
        <div className="pr-4 pl-4 pb-2">
            <Star starClick={ handleStarClick } numberStars={ 5 } />
            <Star starClick={ handleStarClick } numberStars={ 4 } />
            <Star starClick={ handleStarClick } numberStars={ 3 } />
            <Star starClick={ handleStarClick } numberStars={ 2 } />
            <Star starClick={ handleStarClick } numberStars={ 1 } />
        </div>
    )
    

    const handleSub = (sub) => {
        setSub(sub)
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar('')
        setColor('')
        setShipping('')
        setBrand('')
        fetchProducts({ sub })
    }

    const showSubs = () => subs.map((s) => <div className="p-2 m-1 badge badge-secondary" style={{cursor: 'pointer'}} key={s._id} onClick={() => handleSub(s)}>
        {s.name}
    </div>)

    const showBrands = () => brands.map((b, idx) => <Radio
        key={ idx }
        value={ b }
        name={ b }
        checked={ b === brand }
        onChange={ handleBrand }
        className="pb-1 pl-1 pr-4">
        { b }
    </Radio>
    )

    const handleBrand = (e) => {
        setSub('')
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar('')
        setColor('')
        setShipping('')
        setBrand(e.target.value)
        fetchProducts({ brand:e.target.value })
    }

    const showColors = () => colors.map((c, idx) => <Radio
        key={ idx }
        value={ c }
        name={ c }
        checked={ c === color }
        onChange={ handleColor }
        className="pb-1 pl-1 pr-4">
        { c }
    </Radio> )

    const handleColor = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar('')
        setBrand('')
        setShipping('')
        setColor(e.target.value)
        fetchProducts({ color:e.target.value })
    }

    const showShipping = () => (
        <>
            Да
            <Checkbox
            className="mx-2 pb-2"
            onChange={handleShipping}
            value="Да"
            checked={ shipping === 'Да' }
            />
          Нет
            <Checkbox
                className=""
                onChange={ handleShipping }
                value="Нет"
                checked={ shipping === 'Нет' }
            />
            </>
    )

    const handleShipping = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: '' }
        })
        setPrice([0,0])
        setCategoryIds([])
        setStar('')
        setSub('')
        setBrand('')
        setColor('')
        setShipping(e.target.value)
        fetchProducts({ shipping:e.target.value })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Фильтрация</h4>
                    <hr/>
                    <Menu defaultOpenKeys={['1', '2', '3', '4', '5','6', '7']} mode="inline">
                        {/*Price*/}
                        <SubMenu key="1" title={
                            <span className="h6">
                            <DollarOutlined/> Price
                        </span>
                        }>
                            <div>
                                <Slider
                                    className="ml-4 mr-4"
                                    tipFormatter={(value) => `$${value}`}
                                    range
                                    value={ price }
                                    onChange={ handleSlider }
                                    max="4999"
                                />
                            </div>
                        </SubMenu>
                        {/*Категории*/}
                        <SubMenu key="2" title={
                            <span className="h6">
                            <DownSquareOutlined /> Категории
                        </span>
                        }>
                            <div>
                                { showCategories() }
                            </div>
                        </SubMenu>
                        {/*Рейтинг*/}
                        <SubMenu key="3" title={
                            <span className="h6">
                            <StarOutlined /> Рейтинг
                        </span>
                        }>
                            <div>
                                { showProductStarRating() }
                            </div>
                        </SubMenu>
                        {/*Подкатегории*/}
                        <SubMenu key="4" title={
                            <span className="h6">
                            Подкатегории
                        </span>
                        }>
                            <div className="pl-4 pr-4">
                                { showSubs() }
                            </div>
                        </SubMenu>
                        {/*brand*/}
                        <SubMenu key="5" title={
                            <span className="h6">
                            Производитель
                        </span>
                        }>
                            <div className="pl-4 pr-4">
                                { showBrands() }
                            </div>
                        </SubMenu>
                            {/*Цвет*/}
                        <SubMenu key="6" title={
                            <span className="h6">
                            Цвет
                        </span>
                        }>
                            <div className="pl-4 pr-4">
                                { showColors() }
                            </div>
                        </SubMenu>
                        {/*Доставка*/}
                        <SubMenu key="7" title={
                            <span className="h6">
                            Доставка
                        </span>
                        }>
                            <div className="pl-4 pr-4">
                                { showShipping() }
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9 pt-3">
                    {
                        loading ? <Spin/> : <h4 className="text-danger">Товары</h4>
                    }
                    {products.length < 1 && <p>Нет товаров</p>}
                    <div className="row pb-5">
                        {products.map((p) => (
                            <div className="col-md-4 mt-3" key={p._id}>
                                <ProductCard product={ p }/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop