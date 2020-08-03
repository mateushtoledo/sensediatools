import React from 'react'

import ItemCard from '../../../components/ItemCard'

function SelectEndpoint(props) {

    return (
        <div className="container">
            <div className="text-light">
                <h4 className="font-weight-bold">Choose an endpoint</h4>
                <small className="text-uppercase">The tool will create the validation schemas to request and responses of selected endpoint</small>
                <hr />

                <div className="row">
                    {
                        props.endpoints.map(function (endpoint) {
                            return (
                                <div key={endpoint.id} className="col-lg-3 form-group" onClick={ev => props.createEndpointSchema(endpoint.id)}>
                                    <ItemCard 
                                        badgeClass={`badge badge-primary badge-${endpoint.method} `}
                                        badgeText={endpoint.method}
                                        cardTitle="Click here to select this endpoint"
                                        cardText={endpoint.path}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectEndpoint;