import React, { useRef, useState, useEffect } from 'react'

import { faCopy, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showSuccessMessage } from '../../../components/Messages'

import './ShowSchema.css'

const AVAILABLE_CODES = {
    JSON_SCHEMA: "JSON_SCHEMA",
    POSTMAN_TEST: "POSTMAN_TEST"
}

function ShowSchema(props) {
    const [inputContent, setInputContent] = useState("");
    const [showPostmanButton, setShowPostmanButton] = useState(false);
    const [codeToShow, setCodeToShow] = useState(AVAILABLE_CODES.JSON_SCHEMA);
    const [jsonSchema, setJsonSchema] = useState("");
    const [postmanCode, setPostmanCode] = useState("");

    const inputRef = useRef(null);

    // Build postman code (adding schema validation)
    const buildPostmanCode = () => {
        // Validation of response code
        let pmCode = `pm.test("Response with http ${props.responseCode} code", function () {`;
        pmCode += "\n\t"
        pmCode += `pm.response.to.have.status(${props.responseCode});`
        pmCode += "\n});";

        // Validation of presence of content-type header
        pmCode += "\n\npm.test(\"Content-Type is present\", function () {";
        pmCode += "\n\tpm.response.to.have.header(\"Content-Type\");";
        pmCode += "\n});";
            
        // Getting response body and creating schema
        pmCode += "\n\nconst jsonResponseBody = pm.response.json();";
        pmCode += "\nconst jsonSchema = "
        pmCode += JSON.stringify(props.schema, null, 4);
        pmCode += ";";

        // Validating response body against the schema
        pmCode += "\n\npm.test(\"Response schema is valid\", function () {";
        pmCode += "\n\tpm.expect(tv4.validate(jsonResponseBody, jsonSchema)).to.be.true;";
        pmCode += "\n});";

        return pmCode;
    };

    // Copy the content of text area to clipboard
    const copyContentToClipboard = (event) => {
        // Disable link redirect
        event.preventDefault();

        // Copy content to clipboard
        inputRef.current.select();
        document.execCommand('copy');
        event.target.focus();

        // Show message to user
        showSuccessMessage("The validation code has been copied!");
    };

    // Change code at text area
    const changeCode = (codeSelected) => {
        setCodeToShow(codeSelected);

        if (codeSelected === AVAILABLE_CODES.JSON_SCHEMA) {
            setInputContent(jsonSchema);
        } else {
            setInputContent(postmanCode);
        }
    }

    // Run this code before page render
    useEffect(function () {
        let prettySchema = JSON.stringify(props.schema, null, 4);
        setJsonSchema(prettySchema);
        setInputContent(prettySchema);

        try {
            let responseCode = parseInt(props.responseCode);
            if (responseCode >= 100 && responseCode < 600) {
                let pmCode = buildPostmanCode();
                setPostmanCode(pmCode);
                setShowPostmanButton(true);
            } else {
                setShowPostmanButton(false);
            }
        } catch (ex) {
            setShowPostmanButton(false);
        }

    }, [props.responseCode]);

    return (
        <div className="container">
            <div className="text-light">
                <h4 className="font-weight-bold">Done!</h4>
                <small className="text-uppercase">It's the JSON schema validation code to selected request/response.</small>
                <hr />

                {
                    showPostmanButton &&
                    <div className="mb-md-3">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className="btn btn-outline-light active">
                                <input type="radio"
                                    name="options"
                                    id="show-json-schema"
                                    checked={codeToShow === AVAILABLE_CODES.JSON_SCHEMA}
                                    onClick={ev => changeCode(AVAILABLE_CODES.JSON_SCHEMA)}
                                    onChange={() => console.info("showing json schema")}
                                /> Json schema
                            </label>
                            <label className="btn btn-outline-light">
                                <input type="radio"
                                    name="options"
                                    id="show-postman-test"
                                    checked={codeToShow === AVAILABLE_CODES.POSTMAN_TEST}
                                    onClick={ev => changeCode(AVAILABLE_CODES.POSTMAN_TEST)}
                                    onChange={() => console.info("showing postman test")}
                                /> Postman test
                            </label>
                        </div>
                    </div>
                }

                <textarea
                    ref={inputRef}
                    className="form-control schema-content"
                    readOnly
                    rows={12}
                    value={inputContent}
                />

                <div className="text-center">
                    <button className="btn btn-outline-light" onClick={ev => copyContentToClipboard(ev)}>
                        <FontAwesomeIcon icon={faCopy} />
                        &nbsp;COPY CODE
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