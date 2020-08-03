import React from 'react';

import './SensediaToolsHeader.css'

function SensediaToolsHeader(props) {
    return (
        <div className="tools-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <div className="text-center">
                            <a href="#/home">
                                <img src="assets/img/Sensedia_horizontal_color.png" alt="Sensedia Logo" className="sensedia-logo" />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="text-center">
                            <h2 className="page-title">{props.title}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SensediaToolsHeader;
