import React from 'react'

import './ToolCard.css'

function ToolCard(props) {
    return (
        <a href={props.href} target={props.target}>
            <div className="card text-center">
                <div className="card-body">
                    <img src={props.icon} alt="Tool icon" className="tool-icon" />
                    <hr />
                    <h4 className="tool-title">
                        {props.toolName}
                    </h4>
                </div>
            </div>
        </a>
    );
}

export default ToolCard;