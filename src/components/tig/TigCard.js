import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

class TigCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Process: GTAW</CardTitle>
                        <CardSubtitle>Date: {this.props.job.date}</CardSubtitle>
                    </CardBody>
                    <CardImg width="100%" src={this.props.job.img} alt="" />
                    <CardBody>
                        <CardText>{this.props.job.weldType}</CardText>
                        <CardLink href={"/tigJobs/" + this.props.job.id}>Details</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    };
}

export default TigCard;