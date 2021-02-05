import React from 'react'
import { Skeleton, Card } from "antd"

const LoadCard = ({ count }) => {
    const card = () => {
        let cardArray = []
        for(let i = 0; i < count; i++){
            cardArray = [...cardArray, <Card className="col-md-4" key={i}>
                <Skeleton active> </Skeleton>
            </Card> ]
        }
        return cardArray
    }
    return <div className="row pb-4">{card()}</div>
}

export default LoadCard;