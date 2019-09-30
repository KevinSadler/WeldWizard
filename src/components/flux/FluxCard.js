import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';
import '../tig/TigCard.css'

class FluxCard extends Component {
    render() {
        return (
            <div className="jobCard">
                <Card>
                    <CardBody className="cardBody">
                        <CardTitle>Process: FCAW</CardTitle>
                        <CardSubtitle>Date: {this.props.job.date}</CardSubtitle>
                    </CardBody>
                    <CardImg width="100%" src={this.props.job.img} alt="FluxCore Job Image" />
                    <CardBody className="cardBody">
                        <CardText>{this.props.job.weldType}</CardText>
                        <CardLink href={"/fluxJobs/" + this.props.job.id}>Details</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    };
}

export default FluxCard;