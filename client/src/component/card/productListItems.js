import React from 'react'
import { Link } from 'react-router-dom'

const ProductListItems = ({ product }) => {
    const { price, category, subs, shipping, color, brand, quantity, sold } = product
    return (
      <ul className="list-group">
          <li className="list-group-item">
              Price
             <span className="label label-default label-pill pull-xs-right ">${ price }</span>
          </li>
          <li className="list-group-item">
              Category
              <Link to={`/category/${category}`} className="label label-default label-pill pull-xs-right ">
                  { category }
              </Link>
          </li>
          {
              subs && (
                  <li className="list-group-item">
                      Subcategory
                      {
                          subs.map((s) => (
                              <Link to={`/sub/${s.slug}`} key={s._id} className="label label-default label-pill pull-xs-right ">
                                  { s.name }
                              </Link>
                          ))
                      }
                  </li>
              )
          }
          <li className="list-group-item">
              Delivery
              <span className="label label-default label-pill pull-xs-right ">
                  { shipping }
              </span>
          </li>

          <li className="list-group-item">
              Color
              <span className="label label-default label-pill pull-xs-right ">
                  { color }
              </span>
          </li>

          <li className="list-group-item">
            Manufacturer
              <span className="label label-default label-pill pull-xs-right ">
                  { brand }
              </span>
          </li>

          <li className="list-group-item">
            In stock
              <span className="label label-default label-pill pull-xs-right ">
                  { quantity }
              </span>
          </li>

          <li className="list-group-item">
            Sold
              <span className="label label-default label-pill pull-xs-right ">
                  { sold }
              </span>
          </li>
      </ul>
    );
};

export default ProductListItems;