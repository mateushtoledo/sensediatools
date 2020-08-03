import React from 'react'

import ItemCard from '../../../components/ItemCard'

import './SelectSchema.css'

function SelectSchema(props) {

    return (
        <div className="container">
            <div className="text-light">
                <h4 className="font-weight-bold">Choose an endpoint schema</h4>
                <small className="text-uppercase">Please, select one of created schemas to view it code.</small>
                <hr />

                {
                    props.schemas.request &&
                    <div className="form-group">
                        <h5 className="font-weight-bold">Request schemas</h5>
                        <div className="row">
                            <div className="form-group col-lg-3" onClick={ev => props.showJsonSchema(props.schemas.request)}>
                                <ItemCard
                                    badgeClass="badge badge-primary"
                                    badgeText="REQUEST"
                                    cardTitle="Click here to get the JSON schema validation code"
                                    cardText="Request body schema"
                                />
                            </div>
                        </div>
                    </div>

                }

                {
                    props.schemas.responses && props.schemas.responses.length > 0 &&
                    <div className="form-group">
                        <h5 className="font-weight-bold">Response schemas</h5>
                        <div className="row">
                            {
                                props.schemas.responses.map(function (response) {
                                    return (
                                        <div className="form-group col-lg-3" onClick={ev => props.showJsonSchema(response.schema)}>
                                            <ItemCard
                                                badgeClass="badge badge-primary"
                                                badgeText={`HTTP ${response.code} RESPONSE`}
                                                cardTitle="Click here to get the JSON schema validation code"
                                                cardText="Response body schema"
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SelectSchema;