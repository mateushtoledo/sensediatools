import React from 'react'

import Dropzone from 'react-dropzone'
import { showWarningMessage, showErrorMessage } from '../../../components/Messages'
import './SwaggerUploader.css'

function SwaggerUploader(props) {

    const validateAndSaveSwagger = (fileContent) => {
        try {
            let jsonContent = JSON.parse(fileContent);
            if (typeof jsonContent === "object") {
                props.saveSwagger(jsonContent);
            } else {
                showWarningMessage("The sent file is invalid!");
            }
        } catch (error) {
            showErrorMessage("Failed to read file content!");
        }
    };

    const readValidateAndSaveSwagger = (file) => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            validateAndSaveSwagger(event.target.result);
        });
        reader.readAsText(file);
    };

    const handleFileUpload = (uploaded) => {
        let uploadedFile = uploaded[0];

        if (!uploadedFile || !uploadedFile.type || uploadedFile.type !== "application/json") {
            showWarningMessage("Please send a json file!");
            return;
        } else {
            readValidateAndSaveSwagger(uploadedFile);
        }
    };

    return (
        <div className="container text-light">
            <h4 className="font-weight-bold">Upload your swagger 3 file</h4>
            <small className="text-uppercase">The tool accept only json files with swagger 3 content.</small>
            <hr />
            <div className="text-center">
                <div className="file-dropzone form-group" title="Click to choose a file">
                    <Dropzone onDrop={uploadedFiles => handleFileUpload(uploadedFiles)} multiple={false} accept=".json">
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img src="assets/img/upload-icon.png" alt="Upload a swagger 3 file" className="upload-icon" />
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <h5>
                    <span className="font-weight-bold">Choose a file</span> or drag it here
                </h5>
            </div>
        </div>
    )
}

export default SwaggerUploader;