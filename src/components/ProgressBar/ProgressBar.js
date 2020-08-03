import React from 'react'

import './ProgressBar.css'

function ProgressBar(props) {
    return (
        <div className="progress">
            <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${props.progress}%` }} aria-valuenow={props.progress} aria-valuemin="0" aria-valuemax="100">
                Your progress: {props.progress}%
            </div>
        </div>
    );
}

export default ProgressBar;