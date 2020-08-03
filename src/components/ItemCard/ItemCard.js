import React from 'react'

import './ItemCard.css'

function ItemCard(props) {
    return (
        <div className="card border-primary w-100 item-card" title={props.cardTitle}>
            <div className="card-body">
                <span className={props.badgeClass}>{props.badgeText}</span>
                <p className="text-primary">
                    {props.cardText}
                </p>
            </div>
        </div>
    )
}

export default ItemCard;