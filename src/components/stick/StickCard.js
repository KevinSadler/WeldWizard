import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';
import '../tig/TigCard.css'

class StickCard extends Component {
    render() {
        return (
            <div className="jobCard">
                <Card>
                    <CardBody>
                        <CardTitle>Process: SMAW</CardTitle>
                        <CardSubtitle>Date: {this.props.job.date}</CardSubtitle>
                    </CardBody>
                    <CardImg width="100%" src={this.props.job.img} alt="Stick Weld Image" />
                    <CardBody>
                        <CardText>{this.props.job.weldType}</CardText>
                        <CardLink href={"/stickJobs/" + this.props.job.id}>Details</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    };
}

export default StickCard;