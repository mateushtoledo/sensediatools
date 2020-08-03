import React, { useRef } from 'react'

import { faCopy, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showSuccessMessage } from '../../../components/Messages'

import './ShowSchema.css'

function ShowSchema(props) {

    const textAreaRef = useRef(null);

    const copyJsonSchema = (event) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        event.target.focus();

        showSuccessMessage("The validation code is copied!");
    };

    return (
        <div className="container">
            <div className="text-light">
                <h4 className="font-weight-bold">Done!</h4>
                <small className="text-uppercase">It's the JSON schema validation code to selected request/response.</small>
                <hr />
                <textarea
                    ref={textAreaRef}
                    className="form-control schema-content"
                    readOnly rows={12}
                >
                    {JSON.stringify(props.schema, null, 4)}
                </textarea>
                <div className="text-center">
                    <button className="btn btn-outline-light" onClick={ev => copyJsonSchema(ev)}>
                        <FontAwesomeIcon icon={faCopy} />&nbsp;
                        COPY CODE
                    </button>
                    &nbsp;&nbsp;
                    <a className="btn btn-outline-light" href="#/home">
                        <FontAwesomeIcon icon={faHome} />&nbsp;
                        GO TO HOMEPAGE
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ShowSchema;