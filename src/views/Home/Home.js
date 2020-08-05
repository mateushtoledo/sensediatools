import React from 'react';
import { withRouter } from 'react-router-dom'

import SensediaToolsHeader from '../../components/SensediaToolsHeader'
import ToolCard from '../../components/ToolCard'

function Home() {
    return (
        <>
            <SensediaToolsHeader title="Sensedia tools" />
            <div className="content-box">
                <div className="container">
                    <div className="row">

                        <div className="col-md-4 form-group">
                            <ToolCard
                                href="https://www.google.com/url?q=https://openapi-to-postman.herokuapp.com"
                                target="_blank"
                                icon="assets/img/pm-logo.png"
                                toolName="Swagger 3 to postman"
                            />
                        </div>

                        <div className="col-md-4 form-group">
                            <ToolCard
                                href="#/swagger-to-schema"
                                icon="assets/img/swagger-logo.png"
                                toolName="Swagger 3 to json schema"
                            />
                        </div>

                        <div className="col-md-4 form-group">
                            <ToolCard
                                href="https://script.google.com/a/sensedia.com/macros/s/AKfycbwAItF0nYjamMWX9KbBOPFDHRBo0HaJ6BdgDMI-QnDvGnmU85Q/exec"
                                target="_blank"
                                icon="assets/img/gsheets-logo.png"
                                toolName="Data mapping generator"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(Home);