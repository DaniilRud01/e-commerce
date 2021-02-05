import React from 'react'
import StarRatings from "react-star-ratings"

const Star = ({starClick, numberStars}) => {
    return (
        <div>
            <StarRatings
                changeRating={() => starClick(numberStars)}
                numberOfStars={numberStars}
                starDimension="20px"
                starSpacing="2px"
                starHoverColor="red"
                starEmptyColor="red"
            />
        </div>
    )
}

export default Star