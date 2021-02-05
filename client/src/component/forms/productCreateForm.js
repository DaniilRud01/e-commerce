import React from 'react'
import { Select } from 'antd'

const { Option } = Select

const ProductCreateForm = ({ handleChange, handleSubmit, values, handleChangeCategory, subOptions, subShow, setValues }) => {
    const {
        title,
        description,
        price,
        category,
        categories,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand
    } = values
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Delivery</label>
                <select name="shipping"
                        className="form-control"
                        onChange={handleChange}
                >
                    <option>Выбрать</option>
                    <option value="Нет">No</option>
                    <option value="Да">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label>Amount</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Цвет</label>
                <select
                    name="color"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option>Choose color</option>
                    {
                        colors.map((el) => <option key={el} value={el}>{el}</option>)
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Manufacturer</label>
                <select
                    name="brand"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option>Choose</option>
                    {
                        brands.map(b => <option key={b} value={b}>{b}</option>)
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleChangeCategory}>
                    <option>Choose category</option>
                    {
                        categories.length > 0 && categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            {
                subShow && (
                    <div className="form-group">
                        <label>Subcategory</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Choose subcategory"
                            value={ subs }
                            onChange={value => setValues({ ...values, subs: value })}
                        >
                            {
                                subOptions && subOptions.map((s) => (
                                    <Option key={s._id} value={s._id}>{ s.name }</Option>
                                ))
                            }
                        </Select>
                    </div>
                )
            }
            <button className="btn btn-outline-info mt-5">Save</button>
        </form>)
}
export default ProductCreateForm