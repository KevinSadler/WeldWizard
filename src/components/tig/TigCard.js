import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';
import './TigCard.css'

class TigCard extends Component {
    render() {
        return (
            <div className="jobCard">
                <Card>
                    <CardBody className="cardBody">
                        <CardTitle>Process: GTAW</CardTitle>
                        <CardSubtitle>Date: {this.props.job.date}</CardSubtitle>
                    </CardBody>
                    <CardImg width="100%" src={this.props.job.img} alt="Tig Weld Image" />
                    <CardBody className="cardBody">
                        <CardText>{this.props.job.weldType}</CardText>
                        <CardLink className="cardLink" href={"/tigJobs/" + this.props.job.id}>Details</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    };
}

export default TigCard;