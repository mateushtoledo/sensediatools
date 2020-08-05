import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SwaggerUploader from './SwaggerUploader'
import SelectEndpoint from './SelectEndpoint'
import SelectSchema from './SelectSchema'
import ShowSchema from './ShowSchema'
import SensediaToolsHeader from '../../components/SensediaToolsHeader'
import ProgressBar from '../../components/ProgressBar'

import SenschemaApi from '../../api/SenschemaApi'
import {
    showWarningMessage,
    showErrorMessage
} from '../../components/Messages'

const SCREENS = {
    SwaggerUploader: "SwaggerUploader",
    SelectEndpoint: "SelectEndpoint",
    SelectSchema: "SelectSchema",
    ShowSchema: "ShowSchema"
};

function Senschema(props) {

    const [actualScreen, setActualScreen] = useState(SCREENS.SwaggerUploader);
    const [swaggerId, setSwaggerId] = useState(null);
    const [endpoints, setEndpoints] = useState(null);
    const [endpointSchemas, setEndpointSchemas] = useState(null);
    const [selectedSchema, setSelectedSchema] = useState({});
    const [progress, setProgress] = useState(0);

    const showRequestErrorFeedback = (errorResponse) => {
        try {
            showWarningMessage(errorResponse.data.message);
        } catch (error) {
            console.error(errorResponse);
            showErrorMessage("Failed to do the expected action. Please, wait some time, and try again!");
        }
    };

    const saveSwagger = (swagger) => {
        // Persist swagger using API
        const requestBody = { swagger: swagger };
        SenschemaApi.post("/swaggers", requestBody)
            .then(response => {
                setSwaggerId(response.data.id);
                loadSwaggerEndpointsAndChangeScreen(response.data.id);
            })
            .catch(error => {
                showRequestErrorFeedback(error.response);
            });
    };

    const loadSwaggerEndpointsAndChangeScreen = (targetSwagger) => {
        SenschemaApi.get(`/swaggers/${targetSwagger}/endpoints`)
            .then(response => {
                setEndpoints(response.data);
                setActualScreen(SCREENS.SelectEndpoint);
            })
            .catch(error => {
                showRequestErrorFeedback(error.response);
            });
    };

    const createEndpointSchema = (targetEndpoint) => {
        SenschemaApi.get(`/swaggers/${swaggerId}/endpoints/${targetEndpoint}/schemas`)
            .then(response => {
                if (response.data.request || response.data.responses) {
                    setEndpointSchemas(response.data);
                    setActualScreen(SCREENS.SelectSchema);
                } else {
                    showWarningMessage("The selected endpoint doesn't have request/responses with applicaton/json content!");
                }
            })
            .catch(error => {
                console.error(error);
                showRequestErrorFeedback(error.response);
            });
    };

    const previousStep = () => {
        if (actualScreen === SCREENS.SwaggerUploader) {
            // Go to home
            props.history.push("home");
        } else {
            // Change subpage
            switch (actualScreen) {
                case SCREENS.SelectEndpoint:
                    setActualScreen(SCREENS.SwaggerUploader);
                    break;
                case SCREENS.SelectSchema:
                    setActualScreen(SCREENS.SelectEndpoint);
                    break;
                default:
                    setActualScreen(SCREENS.SelectSchema);
                    break;
            }
        }
    };

    const showJsonSchema = (schema) => {
        setSelectedSchema(schema);
        setActualScreen(SCREENS.ShowSchema);
    };

    /**
     * Update the progressbar value after all changes in actualScreen variable.
     */
    useEffect(function () {
        switch (actualScreen) {
            case SCREENS.SwaggerUploader:
                setProgress(0);
                break;
            case SCREENS.SelectEndpoint:
                setProgress(30);
                break;
            case SCREENS.SelectSchema:
                setProgress(80);
                break;
            default:
                setProgress(100);
        }
    }, [actualScreen]);

    return (
        <>
            <SensediaToolsHeader title="Swagger 3 to json schema" />
            <ProgressBar progress={progress} />
            <div className="content-box">
                {
                    {
                        "SwaggerUploader": <SwaggerUploader saveSwagger={saveSwagger} />,
                        "SelectEndpoint": <SelectEndpoint endpoints={endpoints} createEndpointSchema={createEndpointSchema} />,
                        "SelectSchema": <SelectSchema schemas={endpointSchemas} showJsonSchema={showJsonSchema} />,
                        "ShowSchema": <ShowSchema schema={selectedSchema} />
                    }[actualScreen]
                }

            </div>
            <div className="text-center form-group">
                <button className="btn btn-outline-light" onClick={ev => previousStep()}>
                    <FontAwesomeIcon icon={faArrowLeft} />&nbsp;
                    BACK
                </button>
            </div>
        </>
    );
}

export default withRouter(Senschema);